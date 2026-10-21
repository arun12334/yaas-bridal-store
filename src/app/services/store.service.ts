import { computed, Injectable, signal } from '@angular/core';

export interface ShopProduct {
  id: number;
  name: string;
  category: string;
  sub: string;
  price: number;
  oldPrice: number;
  color: string;
  size: string;
  image: string;
}

export interface CartLine {
  product: ShopProduct;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface ShopOrder {
  id: string;
  items: CartLine[];
  total: number;
  customer: CustomerDetails;
  payment: string;
  date: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly cartStorageKey = 'tp_angular_cart';
  private readonly wishlistStorageKey = 'tp_angular_wishlist';
  private readonly orderStorageKey = 'tp_angular_last_order';

  readonly cart = signal<CartLine[]>(this.readStorage<CartLine[]>(this.cartStorageKey, []));
  readonly wishlist = signal<ShopProduct[]>(this.readStorage<ShopProduct[]>(this.wishlistStorageKey, []));
  readonly lastOrder = signal<ShopOrder | null>(this.readStorage<ShopOrder | null>(this.orderStorageKey, null));
  readonly cartDrawerOpen = signal(false);
  readonly cartCount = computed(() => this.cart().reduce((sum, line) => sum + line.quantity, 0));
  readonly wishlistCount = computed(() => this.wishlist().length);
  readonly cartTotal = computed(() => this.cart().reduce((sum, line) => sum + line.product.price * line.quantity, 0));

  addToCart(product: ShopProduct, quantity = 1): void {
    this.cart.update(lines => {
      const existing = lines.find(line => line.product.id === product.id);
      return existing
        ? lines.map(line => line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line)
        : [...lines, { product, quantity }];
    });
    this.persist(this.cartStorageKey, this.cart());
    this.openCart();
  }

  openCart(): void {
    this.cartDrawerOpen.set(true);
  }

  closeCart(): void {
    this.cartDrawerOpen.set(false);
  }

  changeQuantity(productId: number, amount: number): void {
    this.cart.update(lines => lines
      .map(line => line.product.id === productId ? { ...line, quantity: line.quantity + amount } : line)
      .filter(line => line.quantity > 0));
    this.persist(this.cartStorageKey, this.cart());
  }

  removeFromCart(productId: number): void {
    this.cart.update(lines => lines.filter(line => line.product.id !== productId));
    this.persist(this.cartStorageKey, this.cart());
  }

  clearCart(): void {
    this.cart.set([]);
    this.persist(this.cartStorageKey, []);
  }

  isWishlisted(productId: number): boolean {
    return this.wishlist().some(product => product.id === productId);
  }

  toggleWishlist(product: ShopProduct): void {
    this.wishlist.update(products => products.some(item => item.id === product.id)
      ? products.filter(item => item.id !== product.id)
      : [...products, product]);
    this.persist(this.wishlistStorageKey, this.wishlist());
  }

  createOrder(customer: CustomerDetails, payment: string): ShopOrder {
    const order: ShopOrder = {
      id: `TP${Date.now().toString().slice(-8)}`,
      items: this.cart(),
      total: this.cartTotal(),
      customer,
      payment,
      date: new Date().toISOString(),
      status: 'Payment pending',
    };
    this.lastOrder.set(order);
    this.persist(this.orderStorageKey, order);
    const orders = this.readStorage<ShopOrder[]>('tp_orders', []);
    this.persist('tp_orders', [...orders, order]);
    this.clearCart();
    return order;
  }

  updateOrderStatus(status: string): void {
    const order = this.lastOrder();
    if (!order) return;
    const updated = { ...order, status };
    this.lastOrder.set(updated);
    this.persist(this.orderStorageKey, updated);
    const orders = this.readStorage<ShopOrder[]>('tp_orders', []);
    this.persist('tp_orders', orders.map(item => item.id === order.id ? updated : item));
  }

  private readStorage<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? fallback : JSON.parse(stored) as T;
    } catch (error) {
      console.error(`Unable to read saved store data from "${key}".`, error);
      return fallback;
    }
  }

  private persist(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to save store data to "${key}".`, error);
    }
  }
}

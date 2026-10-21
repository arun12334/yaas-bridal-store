import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShopProduct, StoreService } from '../../services/store.service';

type ImageKey = 'beads' | 'stones' | 'threads' | 'tools' | 'tailoring';
type ProductRow = [number, string, string, string, number, number, string, string, ImageKey];

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  readonly store = inject(StoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly quantity = signal(1);
  readonly productId = signal(1);
  readonly imageUrls: Record<ImageKey, string> = {
    beads: 'assets/images/beads.svg',
    stones: 'assets/images/stones.svg',
    threads: 'assets/images/threads.svg',
    tools: 'assets/images/tools.svg',
    tailoring: 'assets/images/tailoring.svg',
  };
  private readonly rows: ProductRow[] = [
    [1, 'Aari Work Pearl Round Shape -1Bunch (12 lines) Color - White (2mm, 3mm, 4mm)', 'Beads Collections', 'Bunch Beads', 120, 120, 'White', '2MM', 'beads'],
    [2, '2mm, 3mm, 4mm Bunch Beads Each 12 String lines Dull Gold Color', 'Beads Collections', 'Bunch Beads', 130, 150, 'Gold', '3MM', 'beads'],
    [3, '(A STAR) Sugar or Seed Beads Gold Color 12-0(2mm) used for regular Aari work', 'Beads Collections', 'Sugar Beads', 35, 40, 'Gold', '2MM', 'beads'],
    [4, '(Priso Brand) Seed or Sugar Beads 12-0 Gold Color', 'Beads Collections', 'Sugar Beads', 45, 45, 'Gold', '2MM', 'beads'],
    [5, 'Glass Seed or Sugar Beads 2MM Rose Color (25grams)', 'Beads Collections', 'Glass Seed Beads', 30, 30, 'Rose', '2MM', 'beads'],
    [6, 'Opaque Seed Beads in Half White Color (14/0) 1.5mm (25grams)', 'Beads Collections', 'Opaque Seed Beads', 30, 40, 'White', '1.5MM', 'beads'],
    [7, 'Glass Seed or Sugar Beads 2mm Green Color (25grams)', 'Beads Collections', 'Glass Seed Beads', 30, 30, 'Green', '2MM', 'beads'],
    [8, 'Simba Sugar or Seed Beads Gold Color 12-0 (2mm)', 'Beads Collections', 'Sugar Beads', 60, 70, 'Gold', '2MM', 'beads'],
    [9, 'Glass Seed or Sugar Beads 2MM Violet Color (25grams)', 'Beads Collections', 'Glass Seed Beads', 30, 30, 'Violet', '2MM', 'beads'],
    [10, 'Glass Seed or Sugar Beads 2MM Gold Color (25grams)', 'Beads Collections', 'Glass Seed Beads', 25, 30, 'Gold', '2MM', 'beads'],
    [11, 'Kundan Clip Stone 10MM x 8MM Rectangle Shape (1Piece)', "Stone's Collections", 'Clip Stone', 5, 5, 'Gold', '10MM', 'stones'],
    [12, 'Kundan Stone Flat Back Framed Eye Shape 4MM x 4MM Color White (25grams)', "Stone's Collections", 'Framed Stones', 45, 55, 'White', '4MM', 'stones'],
    [13, 'Fitting Stones Round Shape 4MM White (25grams)', "Stone's Collections", 'Framed Stones', 45, 45, 'White', '4MM', 'stones'],
    [14, 'D-Cut Moon Shape Kundan Stone 6x4mm (20grams)', "Stone's Collections", 'Matt Kundan Stones', 50, 50, 'Green', '6MM', 'stones'],
    [15, 'Cotton Thread or Sewing Thread Color Gold - 1 piece', 'Tailoring Materials', 'Cotton Threads', 9, 10, 'Gold', '1 Piece', 'threads'],
    [16, 'Heat Erasable Fabric Marker Pens or Erasable Fabric Refills (1Pc)', 'Tailoring Materials', 'Fabric Markers', 10, 15, 'Blue', '1 Piece', 'tailoring'],
    [17, 'Water Erasable Pen for Fabric Marking', 'Tailoring Materials', 'Fabric Markers', 25, 25, 'Blue', '1 Piece', 'tailoring'],
    [18, 'French Knot Needles 2Pcs (Long Needle)', 'Tailoring Materials', 'Needles', 16, 20, 'Silver', '2 Pieces', 'tailoring'],
    [19, 'B-7000 Glue Strong Multi-Purpose Transparent Adhesive (50ML)', 'Tools & Accessories', 'Glue & Adhesives', 65, 80, 'Clear', '50ML', 'tools'],
    [20, 'Carbon Paper for Hand Embroidery Patterns - Pack of 2 Sheets', 'Tools & Accessories', 'Marking Tools', 16, 16, 'Yellow', '2 Sheets', 'tools'],
    [21, 'Silk Thread for Embroidery - Rich Maroon', 'Thread Materials', 'Silk Threads', 45, 55, 'Maroon', '1 Piece', 'threads'],
    [22, 'Zari Thread Gold Color for Aari Work', 'Thread Materials', 'Zari Threads', 20, 30, 'Gold', '1 Piece', 'threads'],
  ];
  readonly products: ShopProduct[] = this.rows.map(([id, name, category, sub, price, oldPrice, color, size, image]) => ({
    id, name, category, sub, price, oldPrice, color, size, image: this.imageUrls[image],
  }));
  readonly product = computed(() => this.products.find(item => item.id === this.productId()) ?? this.products[0]);
  readonly relatedProducts = computed(() => this.products.filter(item =>
    item.category === this.product().category && item.id !== this.product().id).slice(0, 4));

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.productId.set(Number(params.get('id')) || 1);
      this.quantity.set(1);
    });
  }

  addToCart(): void {
    this.store.addToCart(this.product(), this.quantity());
  }

  decreaseQuantity(): void {
    this.quantity.update(value => Math.max(1, value - 1));
  }

  buyNow(): void {
    this.addToCart();
    void this.router.navigate(['/checkout']);
  }

  toggleWishlist(): void {
    this.store.toggleWishlist(this.product());
  }
}

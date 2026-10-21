import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopProduct, StoreService } from '../../../services/store.service';
import {
  BROOCH_FLOWER_IMAGE_BASE,
  BROOCH_FLOWERS,
  BROOCH_PACK_OPTIONS,
} from '../brooch-materials-view/brooch-material.data';

@Component({
  selector: 'app-brooch-materials-full-view',
  imports: [CurrencyPipe, NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brooch-materials-full-view.html',
  styleUrl: './brooch-materials-full-view.css',
})
export class BroochMaterialsFullView {
  private readonly route = inject(ActivatedRoute);
  private readonly queryParamMap = toSignal(this.route.queryParamMap);
  readonly store = inject(StoreService);
  readonly packOptions = BROOCH_PACK_OPTIONS;
  readonly flowerImageBase = BROOCH_FLOWER_IMAGE_BASE;
  readonly quantity = signal(1);
  readonly selectedWeight = signal(BROOCH_PACK_OPTIONS[0].weight);
  readonly flower = computed(() => {
    const id = Number(this.queryParamMap()?.get('id'));
    return BROOCH_FLOWERS.find(item => item.id === id) ?? null;
  });
  readonly selectedPack = computed(
    () => this.packOptions.find(option => option.weight === this.selectedWeight())
      ?? this.packOptions[0],
  );
  readonly product = computed<ShopProduct | null>(() => {
    const flower = this.flower();
    const pack = this.selectedPack();
    if (!flower || !pack) return null;

    const packIndex = this.packOptions.indexOf(pack);
    return {
      id: 10000 + (flower.id * 10) + packIndex,
      name: `${flower.name} - ${pack.weight}g`,
      category: 'Brooch Material',
      sub: 'Brooch Flowers',
      price: pack.price,
      oldPrice: pack.price,
      color: flower.color,
      size: `${pack.weight}g`,
      image: this.flowerImageBase + flower.image,
    };
  });
  readonly isWishlisted = computed(() => {
    const product = this.product();
    return product ? this.store.isWishlisted(product.id) : false;
  });

  onPackWeightChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      const weight = Number(target.value);
      if (this.packOptions.some(option => option.weight === weight)) {
        this.selectedWeight.set(weight);
      }
    }
  }

  decreaseQuantity(): void {
    this.quantity.update(value => Math.max(1, value - 1));
  }

  addToCart(): void {
    const product = this.product();
    if (product) this.store.addToCart(product, this.quantity());
  }

  toggleWishlist(): void {
    const product = this.product();
    if (product) this.store.toggleWishlist(product);
  }
}

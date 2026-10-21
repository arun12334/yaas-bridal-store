import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopProduct, StoreService } from '../../../services/store.service';
import {
  BROOCH_FLOWER_IMAGE_BASE,
  BROOCH_FLOWERS,
  BROOCH_PACK_OPTIONS,
  BroochFlower,
} from './brooch-material.data';

@Component({
  selector: 'app-brooch-materials-view',
  imports: [CurrencyPipe, NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brooch-materials-view.html',
  styleUrl: './brooch-materials-view.css',
})
export class BroochMaterialsView {
  private readonly route = inject(ActivatedRoute);
  private readonly queryParamMap = toSignal(this.route.queryParamMap);
  readonly store = inject(StoreService);

  readonly categoryName = computed(
    () => this.queryParamMap()?.get('q')?.trim() || 'Brooch Material',
  );

  readonly packOptions = BROOCH_PACK_OPTIONS;
  readonly flowers = BROOCH_FLOWERS;
  readonly selectedWeights = signal<Record<number, number>>({});
  readonly isFlowersCategory = computed(() => this.categoryName().toLowerCase() === 'flowers');
  readonly flowerImageBase = BROOCH_FLOWER_IMAGE_BASE;

  selectedPackWeight(flowerId: number): number {
    return this.selectedWeights()[flowerId] ?? this.packOptions[0].weight;
  }

  selectedPackPrice(flowerId: number): number {
    return this.packOptions.find(
      option => option.weight === this.selectedPackWeight(flowerId),
    )?.price ?? this.packOptions[0].price;
  }

  setPackWeight(flowerId: number, value: string): void {
    const weight = Number(value);
    if (this.packOptions.some(option => option.weight === weight)) {
      this.selectedWeights.update(current => ({ ...current, [flowerId]: weight }));
    }
  }

  onPackWeightChange(flowerId: number, event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.setPackWeight(flowerId, target.value);
    }
  }

  addFlowerToCart(flower: BroochFlower): void {
    this.store.addToCart(this.toShopProduct(flower));
  }

  flowerProductId(flower: BroochFlower): number {
    return this.toShopProduct(flower).id;
  }

  private toShopProduct(flower: BroochFlower): ShopProduct {
    const packIndex = this.packOptions.findIndex(
      option => option.weight === this.selectedPackWeight(flower.id),
    );
    const pack = this.packOptions[packIndex];
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
  }

  toggleFlowerWishlist(flower: BroochFlower): void {
    this.store.toggleWishlist(this.toShopProduct(flower));
  }

}

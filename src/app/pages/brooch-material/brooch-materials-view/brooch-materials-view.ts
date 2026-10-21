import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StoreService } from '../../../services/store.service';

interface PackOption {
  weight: number;
  price: number;
}

interface BroochFlower {
  id: number;
  name: string;
  color: string;
  image: string;
  stock: number;
}

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

  readonly packOptions: PackOption[] = [
    { weight: 10, price: 25 },
    { weight: 30, price: 65 },
    { weight: 50, price: 110 },
    { weight: 100, price: 220 },
    { weight: 250, price: 425 },
    { weight: 500, price: 680 },
  ];
  readonly flowers: BroochFlower[] = [
    { id: 1, name: 'Brooch Flower (Rani Pink)', color: 'Rani Pink', image: '1. Rani pink.jpg', stock: 400 },
    { id: 2, name: 'Brooch Flower (White)', color: 'White', image: '2. white.jpg', stock: 400 },
    { id: 3, name: 'Brooch Flower (Lt.Purple)', color: 'Lt.Purple', image: '3. Lt.Purple.jpg', stock: 400 },
    { id: 4, name: 'Brooch Flower (Lt.Green)', color: 'Lt.Green', image: '4. Lt.green.jpg', stock: 400 },
    { id: 5, name: 'Brooch Flower (Multicolour)', color: 'Multicolour', image: '5. Multicolour.jpg', stock: 400 },
    { id: 6, name: 'Brooch Flower (Sky Blue)', color: 'Sky Blue', image: '6. Sky Blue.jpg', stock: 400 },
    { id: 7, name: 'Brooch Flower (Lt.Pink)', color: 'Lt.Pink', image: '7. Lt.Pink.jpg', stock: 400 },
    { id: 8, name: 'Brooch Flower (Purple)', color: 'Purple', image: '8. Purple.jpg', stock: 400 },
    { id: 9, name: 'Brooch Flower (Sky Blue)', color: 'Sky Blue', image: '9. Sky Blue.jpg', stock: 400 },
    { id: 10, name: 'Brooch Flower (Peach)', color: 'Peach', image: '10. Peach.jpg', stock: 400 },
    { id: 11, name: 'Brooch Flower (Yellow)', color: 'Yellow', image: '11. Yellow.jpg', stock: 400 },
    { id: 12, name: 'Brooch Flower (Lt.green)', color: 'Lt.green', image: '12. Lt.green.jpg', stock: 400 },
  ];
  readonly selectedWeights = signal<Record<number, number>>({});
  readonly isFlowersCategory = computed(() => this.categoryName().toLowerCase() === 'flowers');
  readonly flowerImageBase = 'assets/brooch-material/brooch-flower/';

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
    const packIndex = this.packOptions.findIndex(
      option => option.weight === this.selectedPackWeight(flower.id),
    );
    const pack = this.packOptions[packIndex];
    this.store.addToCart({
      id: 10000 + (flower.id * 10) + packIndex,
      name: `${flower.name} - ${pack.weight}g`,
      category: 'Brooch Material',
      sub: 'Brooch Flowers',
      price: pack.price,
      oldPrice: pack.price,
      color: flower.color,
      size: `${pack.weight}g`,
      image: this.flowerImageBase + flower.image,
    });
  }

}

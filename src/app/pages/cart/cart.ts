import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly store = inject(StoreService);
  readonly freeShippingThreshold = 999;

  get shippingProgress(): number {
    return Math.min(100, this.store.cartTotal() / this.freeShippingThreshold * 100);
  }
}

import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerDetails, StoreService } from '../../services/store.service';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  readonly store = inject(StoreService);
  readonly router = inject(Router);
  readonly details: CustomerDetails = { name: '', email: '', phone: '', address: '', city: '', pincode: '' };
  payment = 'upi';

  submitOrder(): void {
    if (!this.store.cart().length) return;
    const order = this.store.createOrder(this.details, this.payment);
    void this.router.navigate(['/payment'], { queryParams: { order: order.id, method: order.payment } });
  }
}

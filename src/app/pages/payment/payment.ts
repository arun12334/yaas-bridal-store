import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-payment',
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  readonly store = inject(StoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly orderId = signal('—');
  readonly method = signal('upi');

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const order = this.store.lastOrder();
      this.orderId.set(params.get('order') || order?.id || '—');
      this.method.set(params.get('method') || order?.payment || 'upi');
    });
  }

  get paymentLabel(): string {
    switch (this.method()) {
      case 'card': return 'Card payment demo';
      case 'netbanking': return 'Net banking demo';
      default: return 'UPI payment demo';
    }
  }

  completeDemoPayment(): void {
    this.store.updateOrderStatus('Demo payment successful');
    void this.router.navigate(['/order-success'], { queryParams: { order: this.orderId() } });
  }
}

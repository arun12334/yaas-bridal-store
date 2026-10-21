import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ChatWidget } from './components/chat-widget/chat-widget';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, Footer, Header, ChatWidget, Breadcrumb, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class App {
  readonly freeShippingThreshold = 999;
  readonly store = inject(StoreService);
  readonly showBackToTop = signal(false);
  private readonly router = inject(Router);
  readonly hideSiteChrome = signal(this.isAccountPage(this.router.url));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(event => this.hideSiteChrome.set(this.isAccountPage(event.urlAfterRedirects)));
  }

  private isAccountPage(url: string): boolean {
    const path = url.split('?')[0];
    return path === '/login' || path === '/registration';
  }

  get shippingProgress(): number {
    return Math.min(100, this.store.cartTotal() / this.freeShippingThreshold * 100);
  }

  get remainingShipping(): number {
    return Math.max(0, this.freeShippingThreshold - this.store.cartTotal());
  }

  onWindowScroll(): void {
    this.showBackToTop.set(window.scrollY > 450);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

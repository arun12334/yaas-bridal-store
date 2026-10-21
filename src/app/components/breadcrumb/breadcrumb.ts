import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, UrlTree } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { BROOCH_FLOWERS } from '../../pages/brooch-material/brooch-materials-view/brooch-material.data';

interface BreadcrumbItem {
  label: string;
  url?: string | UrlTree;
}

const PAGE_LABELS: Record<string, string> = {
  'artificial-flower-making-material': 'Artificial Flower Making Material',
  'aari-material': 'Aari Material',
  'combo-pack': 'Combo Pack',
  'jewellery-making-material': 'Jewellery Making Material',
  'kundan-stone-fitting-stone': 'Kundan Stone / Fitting Stone',
  'packing-materials': 'Packing Materials',
  'tailoring-material': 'Tailoring Material',
  'brooch-material': 'Brooch Material',
};

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (items().length) {
      <div class="container-xl breadcrumb-container">
        <nav class="site-breadcrumb" aria-label="Breadcrumb">
          @for (item of items(); track $index; let last = $last) {
            @if (!$first) {
              <i class="bi bi-chevron-right" aria-hidden="true"></i>
            }
            @if (last) {
              <span aria-current="page">{{ item.label }}</span>
            } @else {
              <a [routerLink]="item.url">{{ item.label }}</a>
            }
          }
        </nav>
      </div>
    }
  `,
  styles: `
    .breadcrumb-container {
      padding-top: 14px;
    }

    .site-breadcrumb {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      color: var(--muted);
      font-size: 13px;
    }

    .site-breadcrumb a {
      color: var(--brand);
      text-decoration: none;
    }

    .site-breadcrumb a:hover {
      color: var(--accent);
    }

    .site-breadcrumb a:focus-visible {
      outline: 3px solid var(--accent);
      outline-offset: 3px;
    }
  `,
})
export class Breadcrumb {
  private readonly router = inject(Router);
  private readonly currentUrl = signal(this.router.url);
  readonly items = computed(() => this.buildBreadcrumbs(this.currentUrl()));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(event => this.currentUrl.set(event.urlAfterRedirects));
  }

  private buildBreadcrumbs(url: string): BreadcrumbItem[] {
    const [path, query = ''] = url.split('?');
    const segments = path.split('/').filter(Boolean);
    const page = segments[0];

    if (!page || page === 'dashboard' || page === 'login' || page === 'registration') {
      return [];
    }

    const home: BreadcrumbItem = { label: 'Home', url: '/dashboard' };
    const params = new URLSearchParams(query);

    if (page === 'brooch-materials-view') {
      const category = params.get('q')?.trim();
      if (!category) return [home, { label: 'Brooch Material' }];
      return [
        home,
        { label: 'Brooch Material', url: '/brooch-material' },
        { label: category },
      ];
    }

    if (page === 'brooch-materials-full-view') {
      const flowerId = Number(params.get('id'));
      const flower = BROOCH_FLOWERS.find(item => item.id === flowerId);
      return [
        home,
        { label: 'Brooch Material', url: '/brooch-material' },
        {
          label: 'Flowers',
          url: this.router.createUrlTree(['/brooch-materials-view'], {
            queryParams: { q: 'Flowers' },
          }),
        },
        { label: flower?.name ?? 'Product not found' },
      ];
    }

    const label = PAGE_LABELS[page];
    if (!label) return [];
    return [home, { label }];
  }
}

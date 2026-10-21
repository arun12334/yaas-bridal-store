import { CurrencyPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';
import { COUNTRY_CURRENCY_OPTIONS } from '../../components/header/header';
import { WelcomeAnimation } from '../../components/welcome-animation/welcome-animation';
import type { CountryCurrencyOption } from '../../components/header/header';
import { CountryPreferenceService } from '../../services/country-preference.service';
import { ShopProduct, StoreService } from '../../services/store.service';

interface DashboardCategoryCard {
  name: string;
  image: string;
}

interface DashboardMenuSection {
  id: string;
  name: string;
  description: string;
  route: string;
  cards: DashboardCategoryCard[];
}

interface TrendingMaterial {
  name: string;
  description: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DecimalPipe, FormsModule, NgOptimizedImage, RouterLink, WelcomeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  readonly store = inject(StoreService);
  private readonly countryPreference = inject(CountryPreferenceService);
  readonly newsletterEmail = signal('');
  readonly newsletterMessage = signal('');
  readonly activeHeroSlide = signal(0);
  readonly countrySelectionOpen = signal(false);
  readonly welcomeAnimationOpen = signal(false);
  readonly countryOptions = COUNTRY_CURRENCY_OPTIONS;
  readonly selectedCountry = this.countryPreference.selectedCountry;
  private readonly destroyRef = inject(DestroyRef);
  readonly imageUrls = {
    beads: 'assets/images/beads.svg',
    stones: 'assets/images/stones.svg',
    threads: 'assets/images/threads.svg',
    tools: 'assets/images/tools.svg',
    tailoring: 'assets/images/tailoring.svg',
  };

  readonly heroSlides = [
    'assets/dashboard/banner-1.png',
    'assets/dashboard/banner-2.png',
    'assets/dashboard/banner-3.png',
    'assets/dashboard/banner-4.png',
  ];

  readonly trendingMaterials: TrendingMaterial[] = [
    {
      name: 'Sugar Beads',
      description: 'Bring a little sparkle to every stitch.',
      image: this.imageUrls.beads,
      route: '/aari-material',
    },
    {
      name: 'Stone Chain',
      description: 'Add a graceful finish to your designs.',
      image: this.imageUrls.stones,
      route: '/aari-material',
    },
    {
      name: 'Zardosi Thread',
      description: 'Create rich details with traditional thread.',
      image: this.imageUrls.threads,
      route: '/aari-material',
    },
    {
      name: 'Aari Needles',
      description: 'Find the right tools for detailed handiwork.',
      image: this.imageUrls.tailoring,
      route: '/aari-material',
    },
    {
      name: 'Embroidery Tools',
      description: 'The little essentials behind beautiful work.',
      image: this.imageUrls.tools,
      route: '/aari-material',
    },
    {
      name: 'Bead Chains',
      description: 'Give your festive projects a sparkling finish.',
      image: this.imageUrls.beads,
      route: '/aari-material',
    },
  ];

  readonly trendingVideo = 'assets/videos/aari-video.mp4';

  readonly menuSections: DashboardMenuSection[] = [
    {
      id: 'combo-pack',
      name: 'Combo Pack',
      description: 'Curated material combinations for every skill level.',
      route: '/combo-pack',
      cards: [
        { name: 'Beginner Combos', image: 'assets/combo-pack/Beginner-Combos.png' },
        { name: 'Professional Combo', image: 'assets/combo-pack/Professional-Combo.png' },
      ],
    },
    {
      id: 'tailoring-material',
      name: 'Tailoring Material',
      description: 'Essentials for sewing, measuring and fabric marking.',
      route: '/tailoring-material',
      cards: [
        { name: 'Fabric Markers', image: this.imageUrls.tailoring },
        { name: 'Needles', image: this.imageUrls.tailoring },
        { name: 'Measuring Tools', image: this.imageUrls.tools },
      ],
    },
    {
      id: 'aari-material',
      name: 'Aari Material',
      description: 'Beads, chains, stones and tools for Aari work.',
      route: '/aari-material',
      cards: [
        { name: 'Sugar Beads', image: this.imageUrls.beads },
        { name: '2mm Cut Beads', image: this.imageUrls.beads },
        { name: '3mm Cut beads', image: this.imageUrls.beads },
        { name: '5 mm Tube Beads', image: this.imageUrls.beads },
        { name: 'Thread Needle', image: this.imageUrls.tailoring },
      ],
    },
    {
      id: 'kundan-stone-fitting-stone',
      name: 'Kundan Stone / Fitting Stone',
      description: 'Explore Kundan and fitting stones in a range of finishes.',
      route: '/kundan-stone-fitting-stone',
      cards: [
        { name: 'Matt Kundan Stone', image: this.imageUrls.stones },
        { name: 'Glossy Kundan Stone', image: this.imageUrls.stones },
        { name: 'White Kundan Stone', image: this.imageUrls.stones },
        { name: 'Ceramic White Kundan Stone', image: this.imageUrls.stones },
        { name: 'Ceramic Gold Kundan Stone', image: this.imageUrls.stones },
      ],
    },
    {
      id: 'jewellery-making-material',
      name: 'Jewellery Making Material',
      description: 'Bases and decorative pieces for jewellery making.',
      route: '/jewellery-making-material',
      cards: [
        { name: 'Bangle Base', image: this.imageUrls.beads },
        { name: 'Charms', image: this.imageUrls.stones },
      ],
    },
    {
      id: 'artificial-flower-making-material',
      name: 'Artificial Flower Making Material',
      description: 'Browse materials for creating artificial flowers.',
      route: '/artificial-flower-making-material',
      cards: [
        { name: 'Browse Flower Materials', image: 'assets/images/craft-hero.svg' },
      ],
    },
    {
      id: 'brooch-material',
      name: 'Brooch Material',
      description: 'Decorative components for making brooches.',
      route: '/brooch-material',
      cards: [
        { name: 'Flowers', image: 'assets/images/craft-hero.svg' },
        { name: 'Petals', image: this.imageUrls.beads },
        { name: 'Shells', image: this.imageUrls.stones },
        { name: 'Butterfly', image: 'assets/images/craft-hero.svg' },
        { name: 'Bows', image: this.imageUrls.threads },
      ],
    },
    {
      id: 'packing-materials',
      name: 'Packing Materials',
      description: 'Browse materials for packing and presenting your creations.',
      route: '/packing-materials',
      cards: [
        { name: 'Browse Packing Materials', image: this.imageUrls.tools },
      ],
    },
  ];

  readonly products: ShopProduct[] = [
    { id: 1, name: 'Aari Work Pearl Round Shape -1Bunch (12 lines) Color - White (2mm, 3mm, 4mm)', category: 'Beads Collections', sub: 'Bunch Beads', price: 120, oldPrice: 120, color: 'White', size: '2MM', image: this.imageUrls.beads },
    { id: 2, name: '2mm, 3mm, 4mm Bunch Beads Each 12 String lines Dull Gold Color', category: 'Beads Collections', sub: 'Bunch Beads', price: 130, oldPrice: 150, color: 'Gold', size: '3MM', image: this.imageUrls.beads },
    { id: 3, name: '(A STAR) Sugar or Seed Beads Gold Color 12-0(2mm) used for regular Aari work', category: 'Beads Collections', sub: 'Sugar Beads', price: 35, oldPrice: 40, color: 'Gold', size: '2MM', image: this.imageUrls.beads },
    { id: 4, name: '(Priso Brand) Seed or Sugar Beads 12-0 Gold Color', category: 'Beads Collections', sub: 'Sugar Beads', price: 45, oldPrice: 45, color: 'Gold', size: '2MM', image: this.imageUrls.beads },
    { id: 5, name: 'Glass Seed or Sugar Beads 2MM Rose Color (25grams)', category: 'Beads Collections', sub: 'Glass Seed Beads', price: 30, oldPrice: 30, color: 'Rose', size: '2MM', image: this.imageUrls.beads },
    { id: 6, name: 'Opaque Seed Beads in Half White Color (14/0) 1.5mm (25grams)', category: 'Beads Collections', sub: 'Opaque Seed Beads', price: 30, oldPrice: 40, color: 'White', size: '1.5MM', image: this.imageUrls.beads },
    { id: 7, name: 'Glass Seed or Sugar Beads 2mm Green Color (25grams)', category: 'Beads Collections', sub: 'Glass Seed Beads', price: 30, oldPrice: 30, color: 'Green', size: '2MM', image: this.imageUrls.beads },
    { id: 8, name: 'Simba Sugar or Seed Beads Gold Color 12-0 (2mm)', category: 'Beads Collections', sub: 'Sugar Beads', price: 60, oldPrice: 70, color: 'Gold', size: '2MM', image: this.imageUrls.beads },
  ];

  ngOnInit(): void {
    const showCountryWelcome = !this.countryPreference.hasSeenWelcome();
    this.countrySelectionOpen.set(showCountryWelcome);
    if (showCountryWelcome) this.countryPreference.resetCountryToDefault();
    if (!showCountryWelcome) this.showFirstLoginWelcome();
    interval(3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.showHeroSlide((this.activeHeroSlide() + 1) % this.heroSlides.length));
  }

  selectCountry(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    this.selectCountryName(target.value);
  }

  selectCountryName(countryName: string): void {
    const country = this.countryOptions.find(option => option.country === countryName);
    if (country) this.countryPreference.selectCountry(country);
  }

  continueWithCountry(): void {
    this.countryPreference.completeWelcome();
    this.countrySelectionOpen.set(false);
    this.showFirstLoginWelcome();
  }

  closeWelcomeAnimation(): void {
    this.welcomeAnimationOpen.set(false);
  }

  showHeroSlide(index: number): void {
    this.activeHeroSlide.set(index);
  }

  subscribe(): void {
    const email = this.newsletterEmail().trim();
    if (!email) return;
    try {
      const subscriptions = JSON.parse(localStorage.getItem('tp_newsletter') ?? '[]') as string[];
      localStorage.setItem('tp_newsletter', JSON.stringify([...subscriptions, email]));
      this.newsletterEmail.set('');
      this.newsletterMessage.set('Thank you for subscribing!');
    } catch (error) {
      console.error('Unable to save the newsletter subscription.', error);
      this.newsletterMessage.set('Your subscription could not be saved. Please try again.');
    }
  }

  private showFirstLoginWelcome(): void {
    try {
      if (localStorage.getItem('tp_first_login_welcome_pending') !== 'true') return;
      localStorage.setItem('tp_first_login_welcome_seen', 'true');
      localStorage.removeItem('tp_first_login_welcome_pending');
      this.welcomeAnimationOpen.set(true);
    } catch (error) {
      console.error('Unable to load the first-login welcome state.', error);
    }
  }
}

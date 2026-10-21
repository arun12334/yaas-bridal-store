import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { interval } from 'rxjs';
import { CountryPreferenceService } from '../../services/country-preference.service';
import { StoreService } from '../../services/store.service';

export interface NavigationCategory {
  name: string;
  category: string;
  icon: string;
}

export const NAVIGATION_CATEGORIES: NavigationCategory[] = [
  { name: 'Beads Collections', category: 'Beads Collections', icon: 'bi bi-circle' },
  { name: "Stone's Collections", category: "Stone's Collections", icon: 'bi bi-gem' },
  { name: 'Thread Materials', category: 'Thread Materials', icon: 'bi bi-reception-4' },
  { name: 'Tools & Accessories', category: 'Tools & Accessories', icon: 'bi bi-scissors' },
  { name: 'Tailoring Materials', category: 'Tailoring Materials', icon: 'bi bi-rulers' },
];

export interface CountryCurrencyOption {
  code: string;
  country: string;
}

export const COUNTRY_CURRENCY_OPTIONS: CountryCurrencyOption[] = [
  { code: 'AFN', country: 'Afghanistan' }, { code: 'EUR', country: 'Aland Islands' }, { code: 'ALL', country: 'Albania' },
  { code: 'DZD', country: 'Algeria' }, { code: 'USD', country: 'American Samoa' }, { code: 'EUR', country: 'Andorra' },
  { code: 'AOA', country: 'Angola' }, { code: 'XCD', country: 'Anguilla' }, { code: 'XCD', country: 'Antigua and Barbuda' },
  { code: 'ARS', country: 'Argentina' }, { code: 'AMD', country: 'Armenia' }, { code: 'AWG', country: 'Aruba' },
  { code: 'AUD', country: 'Australia' }, { code: 'EUR', country: 'Austria' }, { code: 'AZN', country: 'Azerbaijan' },
  { code: 'BSD', country: 'Bahamas' }, { code: 'BHD', country: 'Bahrain' }, { code: 'BDT', country: 'Bangladesh' },
  { code: 'BBD', country: 'Barbados' }, { code: 'BYN', country: 'Belarus' }, { code: 'EUR', country: 'Belgium' },
  { code: 'BZD', country: 'Belize' }, { code: 'XOF', country: 'Benin' }, { code: 'BMD', country: 'Bermuda' },
  { code: 'BTN', country: 'Bhutan' }, { code: 'BOB', country: 'Bolivia' }, { code: 'USD', country: 'Bonaire, Saint Eustatius and Saba' },
  { code: 'BAM', country: 'Bosnia and Herzegovina' }, { code: 'BWP', country: 'Botswana' }, { code: 'NOK', country: 'Bouvet Island' },
  { code: 'BRL', country: 'Brazil' }, { code: 'USD', country: 'British Indian Ocean Territory' }, { code: 'USD', country: 'British Virgin Islands' },
  { code: 'BND', country: 'Brunei' }, { code: 'BGN', country: 'Bulgaria' }, { code: 'XOF', country: 'Burkina Faso' },
  { code: 'BIF', country: 'Burundi' }, { code: 'KHR', country: 'Cambodia' }, { code: 'XAF', country: 'Cameroon' },
  { code: 'CAD', country: 'Canada' }, { code: 'CVE', country: 'Cape Verde' }, { code: 'KYD', country: 'Cayman Islands' },
  { code: 'XAF', country: 'Central African Republic' }, { code: 'XAF', country: 'Chad' }, { code: 'CLP', country: 'Chile' },
  { code: 'CNY', country: 'China' }, { code: 'AUD', country: 'Christmas Island' }, { code: 'AUD', country: 'Cocos Islands' },
  { code: 'COP', country: 'Colombia' }, { code: 'KMF', country: 'Comoros' }, { code: 'NZD', country: 'Cook Islands' },
  { code: 'CRC', country: 'Costa Rica' }, { code: 'EUR', country: 'Croatia' }, { code: 'CUP', country: 'Cuba' },
  { code: 'ANG', country: 'Curacao' }, { code: 'EUR', country: 'Cyprus' }, { code: 'CZK', country: 'Czech Republic' },
  { code: 'CDF', country: 'Democratic Republic of the Congo' }, { code: 'DKK', country: 'Denmark' }, { code: 'DJF', country: 'Djibouti' },
  { code: 'XCD', country: 'Dominica' }, { code: 'DOP', country: 'Dominican Republic' }, { code: 'USD', country: 'East Timor' },
  { code: 'USD', country: 'Ecuador' }, { code: 'EGP', country: 'Egypt' }, { code: 'USD', country: 'El Salvador' },
  { code: 'XAF', country: 'Equatorial Guinea' }, { code: 'ERN', country: 'Eritrea' }, { code: 'EUR', country: 'Estonia' },
  { code: 'ETB', country: 'Ethiopia' }, { code: 'FKP', country: 'Falkland Islands' }, { code: 'DKK', country: 'Faroe Islands' },
  { code: 'FJD', country: 'Fiji' }, { code: 'EUR', country: 'Finland' }, { code: 'EUR', country: 'France' },
  { code: 'EUR', country: 'French Guiana' }, { code: 'XPF', country: 'French Polynesia' }, { code: 'EUR', country: 'French Southern Territories' },
  { code: 'XAF', country: 'Gabon' }, { code: 'GMD', country: 'Gambia' }, { code: 'GEL', country: 'Georgia' },
  { code: 'EUR', country: 'Germany' }, { code: 'GHS', country: 'Ghana' }, { code: 'GIP', country: 'Gibraltar' },
  { code: 'EUR', country: 'Greece' }, { code: 'DKK', country: 'Greenland' }, { code: 'XCD', country: 'Grenada' },
  { code: 'EUR', country: 'Guadeloupe' }, { code: 'USD', country: 'Guam' }, { code: 'GTQ', country: 'Guatemala' },
  { code: 'GBP', country: 'Guernsey' }, { code: 'GNF', country: 'Guinea' }, { code: 'XOF', country: 'Guinea-Bissau' },
  { code: 'GYD', country: 'Guyana' }, { code: 'HTG', country: 'Haiti' }, { code: 'AUD', country: 'Heard Island and McDonald Islands' },
  { code: 'HNL', country: 'Honduras' }, { code: 'HKD', country: 'Hong Kong' }, { code: 'HUF', country: 'Hungary' },
  { code: 'ISK', country: 'Iceland' }, { code: 'INR', country: 'India' }, { code: 'IDR', country: 'Indonesia' },
  { code: 'IRR', country: 'Iran' }, { code: 'IQD', country: 'Iraq' }, { code: 'EUR', country: 'Ireland' },
  { code: 'GBP', country: 'Isle of Man' }, { code: 'ILS', country: 'Israel' }, { code: 'EUR', country: 'Italy' },
  { code: 'XOF', country: 'Ivory Coast' }, { code: 'JMD', country: 'Jamaica' }, { code: 'JPY', country: 'Japan' },
  { code: 'GBP', country: 'Jersey' }, { code: 'JOD', country: 'Jordan' }, { code: 'KZT', country: 'Kazakhstan' },
  { code: 'KES', country: 'Kenya' }, { code: 'AUD', country: 'Kiribati' }, { code: 'EUR', country: 'Kosovo' },
  { code: 'KWD', country: 'Kuwait' }, { code: 'KGS', country: 'Kyrgyzstan' }, { code: 'LAK', country: 'Laos' },
  { code: 'EUR', country: 'Latvia' }, { code: 'LBP', country: 'Lebanon' }, { code: 'LSL', country: 'Lesotho' },
  { code: 'LRD', country: 'Liberia' }, { code: 'LYD', country: 'Libya' }, { code: 'CHF', country: 'Liechtenstein' },
  { code: 'EUR', country: 'Lithuania' }, { code: 'EUR', country: 'Luxembourg' }, { code: 'MOP', country: 'Macao' },
  { code: 'MKD', country: 'Macedonia' }, { code: 'MGA', country: 'Madagascar' }, { code: 'MWK', country: 'Malawi' },
  { code: 'MYR', country: 'Malaysia' }, { code: 'MVR', country: 'Maldives' }, { code: 'XOF', country: 'Mali' },
  { code: 'EUR', country: 'Malta' }, { code: 'USD', country: 'Marshall Islands' }, { code: 'EUR', country: 'Martinique' },
  { code: 'MRU', country: 'Mauritania' }, { code: 'MUR', country: 'Mauritius' }, { code: 'EUR', country: 'Mayotte' },
  { code: 'MXN', country: 'Mexico' }, { code: 'USD', country: 'Micronesia' }, { code: 'MDL', country: 'Moldova' },
  { code: 'EUR', country: 'Monaco' }, { code: 'MNT', country: 'Mongolia' }, { code: 'EUR', country: 'Montenegro' },
  { code: 'XCD', country: 'Montserrat' }, { code: 'MAD', country: 'Morocco' }, { code: 'MZN', country: 'Mozambique' },
  { code: 'MMK', country: 'Myanmar' }, { code: 'NAD', country: 'Namibia' }, { code: 'AUD', country: 'Nauru' },
  { code: 'NPR', country: 'Nepal' }, { code: 'EUR', country: 'Netherlands' }, { code: 'XPF', country: 'New Caledonia' },
  { code: 'NZD', country: 'New Zealand' }, { code: 'NIO', country: 'Nicaragua' }, { code: 'XOF', country: 'Niger' },
  { code: 'NGN', country: 'Nigeria' }, { code: 'NZD', country: 'Niue' }, { code: 'AUD', country: 'Norfolk Island' },
  { code: 'KPW', country: 'North Korea' }, { code: 'USD', country: 'Northern Mariana Islands' }, { code: 'NOK', country: 'Norway' },
  { code: 'OMR', country: 'Oman' }, { code: 'PKR', country: 'Pakistan' }, { code: 'USD', country: 'Palau' },
  { code: 'ILS', country: 'Palestinian Territory' }, { code: 'PAB', country: 'Panama' }, { code: 'PGK', country: 'Papua New Guinea' },
  { code: 'PYG', country: 'Paraguay' }, { code: 'PEN', country: 'Peru' }, { code: 'PHP', country: 'Philippines' },
  { code: 'NZD', country: 'Pitcairn' }, { code: 'PLN', country: 'Poland' }, { code: 'EUR', country: 'Portugal' },
  { code: 'USD', country: 'Puerto Rico' }, { code: 'QAR', country: 'Qatar' }, { code: 'XAF', country: 'Republic of the Congo' },
  { code: 'EUR', country: 'Reunion' }, { code: 'RON', country: 'Romania' }, { code: 'RUB', country: 'Russia' },
  { code: 'RWF', country: 'Rwanda' }, { code: 'EUR', country: 'Saint Barthelemy' }, { code: 'SHP', country: 'Saint Helena' },
  { code: 'XCD', country: 'Saint Kitts and Nevis' }, { code: 'XCD', country: 'Saint Lucia' }, { code: 'EUR', country: 'Saint Martin' },
  { code: 'EUR', country: 'Saint Pierre and Miquelon' }, { code: 'XCD', country: 'Saint Vincent and the Grenadines' }, { code: 'WST', country: 'Samoa' },
  { code: 'EUR', country: 'San Marino' }, { code: 'STN', country: 'Sao Tome and Principe' }, { code: 'SAR', country: 'Saudi Arabia' },
  { code: 'XOF', country: 'Senegal' }, { code: 'RSD', country: 'Serbia' }, { code: 'SCR', country: 'Seychelles' },
  { code: 'SLE', country: 'Sierra Leone' }, { code: 'SGD', country: 'Singapore' }, { code: 'ANG', country: 'Sint Maarten' },
  { code: 'EUR', country: 'Slovakia' }, { code: 'EUR', country: 'Slovenia' }, { code: 'SBD', country: 'Solomon Islands' },
  { code: 'SOS', country: 'Somalia' }, { code: 'ZAR', country: 'South Africa' }, { code: 'GBP', country: 'South Georgia and the South Sandwich Islands' },
  { code: 'KRW', country: 'South Korea' }, { code: 'SSP', country: 'South Sudan' }, { code: 'EUR', country: 'Spain' },
  { code: 'LKR', country: 'Sri Lanka' }, { code: 'SDG', country: 'Sudan' }, { code: 'SRD', country: 'Suriname' },
  { code: 'NOK', country: 'Svalbard and Jan Mayen' }, { code: 'SZL', country: 'Swaziland' }, { code: 'SEK', country: 'Sweden' },
  { code: 'CHF', country: 'Switzerland' }, { code: 'SYP', country: 'Syria' }, { code: 'TWD', country: 'Taiwan' },
  { code: 'TJS', country: 'Tajikistan' }, { code: 'TZS', country: 'Tanzania' }, { code: 'THB', country: 'Thailand' },
  { code: 'XOF', country: 'Togo' }, { code: 'NZD', country: 'Tokelau' }, { code: 'TOP', country: 'Tonga' },
  { code: 'TTD', country: 'Trinidad and Tobago' }, { code: 'TND', country: 'Tunisia' }, { code: 'TRY', country: 'Turkey' },
  { code: 'TMT', country: 'Turkmenistan' }, { code: 'USD', country: 'Turks and Caicos Islands' }, { code: 'AUD', country: 'Tuvalu' },
  { code: 'USD', country: 'U.S. Virgin Islands' }, { code: 'UGX', country: 'Uganda' }, { code: 'UAH', country: 'Ukraine' },
  { code: 'AED', country: 'United Arab Emirates' }, { code: 'GBP', country: 'United Kingdom' }, { code: 'USD', country: 'United States' },
  { code: 'USD', country: 'United States Minor Outlying Islands' }, { code: 'UYU', country: 'Uruguay' }, { code: 'UZS', country: 'Uzbekistan' },
  { code: 'VUV', country: 'Vanuatu' }, { code: 'EUR', country: 'Vatican' }, { code: 'VES', country: 'Venezuela' },
  { code: 'VND', country: 'Vietnam' }, { code: 'XPF', country: 'Wallis and Futuna' }, { code: 'MAD', country: 'Western Sahara' },
  { code: 'YER', country: 'Yemen' }, { code: 'ZMW', country: 'Zambia' }, { code: 'ZWL', country: 'Zimbabwe' },
];

const HEADER_MENU_ITEMS = [
  { name: 'Combo Pack', route: '/combo-pack' },
  { name: 'Tailoring Material', route: '/tailoring-material' },
  { name: 'Aari Material', route: '/aari-material' },
  { name: 'Kundan Stone / Fitting Stone', route: '/kundan-stone-fitting-stone' },
  { name: 'Jewellery Making Material', route: '/jewellery-making-material' },
  { name: 'Artificial Flower Making Material', route: '/artificial-flower-making-material' },
  { name: 'Brooch Material', route: '/brooch-material' },
  { name: 'Packing Materials', route: '/packing-materials' },
];

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe, FormsModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  readonly store = inject(StoreService);
  readonly searchTerm = signal('');
  readonly mobileMenuOpen = signal(false);
  readonly primaryMenuItems = HEADER_MENU_ITEMS.slice(0, 5);
  readonly moreMenuItems = HEADER_MENU_ITEMS.slice(5);
  readonly moreMenuOpen = signal(false);
  readonly menuItems = HEADER_MENU_ITEMS;
  readonly countryOptions = COUNTRY_CURRENCY_OPTIONS;
  private readonly countryPreference = inject(CountryPreferenceService);
  readonly selectedCountry = this.countryPreference.selectedCountry;
  readonly promoMessages = [
    { icon: 'bi bi-gift', text: '100% secure online payment · COD not available' },
    { icon: 'bi bi-fire', text: 'Free shipping available on orders above ₹999/-' },
  ];
  readonly activePromoMessage = signal(0);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    interval(3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.activePromoMessage.update(index => (index + 1) % this.promoMessages.length));
  }

  search(): void {
    this.mobileMenuOpen.set(false);
    void this.router.navigate(['/collection'], { queryParams: { q: this.searchTerm().trim() || null } });
  }

  selectCountry(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    const country = this.countryOptions.find(option => option.country === target.value);
    if (country) this.countryPreference.selectCountry(country);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.moreMenuOpen.set(false);
  }

  openMoreMenu(): void {
    this.moreMenuOpen.set(true);
  }

  closeMoreMenu(): void {
    this.moreMenuOpen.set(false);
  }
}

import { Injectable, signal } from '@angular/core';
import type { CountryCurrencyOption } from '../components/header/header';

const COUNTRY_STORAGE_KEY = 'tp_selected_country';
const WELCOME_STORAGE_KEY = 'tp_country_welcome_seen';
const DEFAULT_COUNTRY: CountryCurrencyOption = { code: 'INR', country: 'India' };

@Injectable({ providedIn: 'root' })
export class CountryPreferenceService {
  readonly selectedCountry = signal(this.readSelectedCountry());

  private readSelectedCountry(): CountryCurrencyOption {
    try {
      const savedCountry: unknown = JSON.parse(localStorage.getItem(COUNTRY_STORAGE_KEY) ?? 'null');
      if (
        typeof savedCountry === 'object' &&
        savedCountry !== null &&
        'code' in savedCountry &&
        'country' in savedCountry &&
        typeof savedCountry.code === 'string' &&
        typeof savedCountry.country === 'string'
      ) {
        return { code: savedCountry.code, country: savedCountry.country };
      }
    } catch (error) {
      console.error('Unable to read the saved country preference.', error);
    }
    return DEFAULT_COUNTRY;
  }

  selectCountry(country: CountryCurrencyOption): void {
    this.selectedCountry.set(country);
    try {
      localStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify(country));
    } catch (error) {
      console.error('Unable to save the country preference.', error);
    }
  }

  resetCountryToDefault(): void {
    this.selectCountry(DEFAULT_COUNTRY);
  }

  hasSeenWelcome(): boolean {
    try {
      return localStorage.getItem(WELCOME_STORAGE_KEY) === 'true';
    } catch (error) {
      console.error('Unable to read the country welcome preference.', error);
      return false;
    }
  }

  completeWelcome(): void {
    try {
      localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
    } catch (error) {
      console.error('Unable to save the country welcome preference.', error);
    }
  }
}

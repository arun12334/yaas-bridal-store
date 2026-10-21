import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface RegistrationDetails {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-registration',
  imports: [FormsModule, NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  readonly details: RegistrationDetails = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  register(): void {
    this.successMessage.set('');

    if (this.details.password !== this.details.confirmPassword) {
      this.errorMessage.set('Passwords do not match. Please check and try again.');
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set(
      'Your details are ready. Account creation requires a connected authentication service.',
    );
  }
}

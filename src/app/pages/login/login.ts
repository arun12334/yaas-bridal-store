import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly demoEmail = 'tamil@gmail.com';
  readonly demoPassword = '123456';
  readonly credentials: LoginCredentials = { email: '', password: '' };
  readonly errorMessage = signal('');
  private readonly router = inject(Router);

  login(): void {
    const email = this.credentials.email.trim().toLowerCase();
    if (email === this.demoEmail && this.credentials.password === this.demoPassword) {
      this.errorMessage.set('');
      try {
        if (localStorage.getItem('tp_first_login_welcome_seen') !== 'true') {
          localStorage.setItem('tp_first_login_welcome_pending', 'true');
        }
      } catch (error) {
        console.error('Unable to save the first-login welcome state.', error);
      }
      void this.router.navigateByUrl('/dashboard');
      return;
    }

    this.errorMessage.set('The email or password is incorrect. Please try the demo credentials below.');
  }
}

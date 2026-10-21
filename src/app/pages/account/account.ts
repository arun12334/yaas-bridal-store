import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DemoAccount {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-account',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  readonly account: DemoAccount = { name: '', email: '', phone: '' };
  readonly message = signal('');

  saveAccount(): void {
    try {
      localStorage.setItem('tp_demo_account', JSON.stringify(this.account));
      this.message.set(`Welcome, ${this.account.name}! This is a local demo account; connect authentication for production.`);
    } catch (error) {
      console.error('Unable to save the demo account.', error);
      this.message.set('Your account details could not be saved. Please try again.');
    }
  }
}

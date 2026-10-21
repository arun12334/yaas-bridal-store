import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  date: string;
}

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly form: ContactMessage = { name: '', email: '', message: '', date: '' };
  readonly successMessage = signal('');

  submit(): void {
    try {
      const messages = JSON.parse(localStorage.getItem('tp_contact_messages') ?? '[]') as ContactMessage[];
      const savedMessage = { ...this.form, date: new Date().toISOString() };
      localStorage.setItem('tp_contact_messages', JSON.stringify([...messages, savedMessage]));
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
      this.successMessage.set('Thank you! Your message was saved in this demo.');
    } catch (error) {
      console.error('Unable to save the contact message.', error);
      this.successMessage.set('Your message could not be saved. Please try again.');
    }
  }
}

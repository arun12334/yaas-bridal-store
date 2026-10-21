import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatForm {
  phone: string;
  email: string;
  department: string;
  message: string;
}

@Component({
  selector: 'app-chat-widget',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css',
})
export class ChatWidget {
  readonly chatOpen = signal(false);
  readonly chatForm: ChatForm = { phone: '', email: '', department: '', message: '' };

  startChat(): void {
    const message = [
      `Hello, I need help with ${this.chatForm.department}.`,
      `Phone: ${this.chatForm.phone.trim()}`,
      `Email: ${this.chatForm.email.trim()}`,
      `Message: ${this.chatForm.message.trim()}`,
    ].join('\n');
    const url = `https://wa.me/919688526199?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

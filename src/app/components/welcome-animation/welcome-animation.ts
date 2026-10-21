import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-welcome-animation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome-animation.html',
  styleUrl: './welcome-animation.css',
})
export class WelcomeAnimation {
  readonly dismissed = output<void>();
  readonly confettiPieces = Array.from({ length: 28 }, (_, index) => index);
  readonly streamers = Array.from({ length: 9 }, (_, index) => index);

  dismiss(): void {
    this.dismissed.emit();
  }
}

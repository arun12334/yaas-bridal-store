import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVIGATION_CATEGORIES } from '../header/header';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly categories = NAVIGATION_CATEGORIES;
  readonly year = new Date().getFullYear();
}

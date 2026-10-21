import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ComboPackCategory {
  id: string;
  title: string;
  image: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-combo-pack',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combo-pack.html',
  styleUrl: './combo-pack.css',
})
export class ComboPack {
  readonly categories: ComboPackCategory[] = [
    {
      id: 'beginner-combos',
      title: 'Beginner Combos',
      image: '/assets/combo-pack/Beginner-Combos.png',
      width: 1536,
      height: 1024,
    },
    {
      id: 'professional-combo',
      title: 'Professional Combo',
      image: '/assets/combo-pack/Professional-Combo.png',
      width: 1254,
      height: 1254,
    },
  ];
}

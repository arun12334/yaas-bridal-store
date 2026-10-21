import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface BroochCategory {
  name: string;
  image: string;
}

@Component({
  selector: 'app-brooch-material',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brooch-material.html',
  styleUrl: './brooch-material.css',
})
export class BroochMaterial {
  readonly categories: BroochCategory[] = [
    { name: 'Flowers', image: 'assets/images/craft-hero.svg' },
    { name: 'Petals', image: 'assets/images/beads.svg' },
    { name: 'Shells', image: 'assets/images/stones.svg' },
    { name: 'Butterfly', image: 'assets/images/craft-hero.svg' },
    { name: 'Bows', image: 'assets/images/threads.svg' },
    { name: 'Mini Flowers', image: 'assets/images/craft-hero.svg' },
  ];
}

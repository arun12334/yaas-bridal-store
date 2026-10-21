import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface BroochCategory {
  name: string;
  searchTerm: string;
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
    { name: 'Flowers', searchTerm: 'Flowers', image: 'assets/images/craft-hero.svg' },
    { name: 'Petals', searchTerm: 'Petals', image: 'assets/images/beads.svg' },
    { name: 'Shells', searchTerm: 'Shells', image: 'assets/images/stones.svg' },
    { name: 'Butterfly', searchTerm: 'Butterfly', image: 'assets/images/craft-hero.svg' },
    { name: 'Bows', searchTerm: 'Bows', image: 'assets/images/threads.svg' },
    { name: 'Mini Flowers', searchTerm: 'Mini Flowers', image: 'assets/images/craft-hero.svg' },
  ];
}

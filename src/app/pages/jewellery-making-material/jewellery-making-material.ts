import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface JewelleryCategory {
  name: string;
  searchTerm: string;
  image: string;
}

@Component({
  selector: 'app-jewellery-making-material',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jewellery-making-material.html',
  styleUrl: './jewellery-making-material.css',
})
export class JewelleryMakingMaterial {
  readonly categories: JewelleryCategory[] = [
    { name: 'Bangle Base', searchTerm: 'Bangle Base', image: 'assets/images/beads.svg' },
    { name: 'Charms', searchTerm: 'Charms', image: 'assets/images/stones.svg' },
  ];
}

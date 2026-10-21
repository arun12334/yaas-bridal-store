import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface AariMaterialCategory {
  name: string;
  searchTerm: string;
  image: string;
}

@Component({
  selector: 'app-aari-material',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './aari-material.html',
  styleUrl: './aari-material.css',
})
export class AariMaterial {
  readonly categories: AariMaterialCategory[] = [
    { name: 'Sugar Beads', searchTerm: 'Sugar Beads', image: 'assets/images/beads.svg' },
    { name: '2mm Cut Beads', searchTerm: '2mm Cut Beads', image: 'assets/images/beads.svg' },
    { name: '3mm Cut Beads', searchTerm: '3mm Cut Beads', image: 'assets/images/beads.svg' },
    { name: '5 mm Tube Beads', searchTerm: '5 mm Tube Beads', image: 'assets/images/beads.svg' },
    { name: 'Thread Needle', searchTerm: 'Thread Needle', image: 'assets/images/tailoring.svg' },
    { name: 'Beads Needle', searchTerm: 'Beads Needle', image: 'assets/images/beads.svg' },
    { name: 'Zardosi Needle', searchTerm: 'Zardosi Needle', image: 'assets/images/tailoring.svg' },
    { name: 'Bunch Beads', searchTerm: 'Bunch Beads', image: 'assets/images/beads.svg' },
    { name: 'Stone chain', searchTerm: 'Stone chain', image: 'assets/images/stones.svg' },
    { name: 'Ball Chain', searchTerm: 'Ball Chain', image: 'assets/images/stones.svg' },
    { name: 'Bead Chain', searchTerm: 'Bead Chain', image: 'assets/images/beads.svg' },
    { name: 'Chamki / Sequence', searchTerm: 'Chamki Sequence', image: 'assets/images/beads.svg' },
    { name: 'Flower Polo Rings', searchTerm: 'Flower Polo Rings', image: 'assets/images/beads.svg' },
    { name: 'Zardosi', searchTerm: 'Zardosi', image: 'assets/images/threads.svg' },
    { name: 'Nakshi', searchTerm: 'Nakshi', image: 'assets/images/stones.svg' },
    { name: 'Thilagam Stone', searchTerm: 'Thilagam Stone', image: 'assets/images/stones.svg' },
    { name: 'Round Stone', searchTerm: 'Round Stone', image: 'assets/images/stones.svg' },
    { name: 'Eye Shape Stone', searchTerm: 'Eye Shape Stone', image: 'assets/images/stones.svg' },
    { name: 'Mirror Work', searchTerm: 'Mirror Work', image: 'assets/images/stones.svg' },
    { name: 'Lakshmi Coin 1.5cm Gold', searchTerm: 'Lakshmi Coin 1.5cm Gold', image: 'assets/images/stones.svg' },
    { name: 'Lakshmi Coin 1cm Gold', searchTerm: 'Lakshmi Coin 1cm Gold', image: 'assets/images/stones.svg' },
    { name: 'Pendant', searchTerm: 'Pendant', image: 'assets/images/stones.svg' },
  ];
}

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface KundanStoneCategory {
  name: string;
  searchTerm: string;
}

@Component({
  selector: 'app-kundan-stone-fitting-stone',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kundan-stone-fitting-stone.html',
  styleUrl: './kundan-stone-fitting-stone.css',
})
export class KundanStoneFittingStone {
  readonly image = 'assets/images/stones.svg';
  readonly categories: KundanStoneCategory[] = [
    { name: 'Matt Kundan Stone', searchTerm: 'Matt Kundan Stone' },
    { name: 'Glossy Kundan Stone', searchTerm: 'Glossy Kundan Stone' },
    { name: 'White Kundan Stone', searchTerm: 'White Kundan Stone' },
    { name: 'Ceramic White Kundan Stone', searchTerm: 'Ceramic White Kundan Stone' },
    { name: 'Ceramic Gold Kundan Stone', searchTerm: 'Ceramic Gold Kundan Stone' },
    { name: 'Gold Kundan Stone', searchTerm: 'Gold Kundan Stone' },
    { name: 'Silver Kundan Stone', searchTerm: 'Silver Kundan Stone' },
    { name: 'Copper Kundan Stone', searchTerm: 'Copper Kundan Stone' },
  ];
}

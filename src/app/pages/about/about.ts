import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AboutBanner {
  image: string;
  alt: string;
  title: string;
  description: string;
}

interface AboutReason {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly banners: AboutBanner[] = [
    {
      alt: 'Aari embroidery kit with threads, needles, beads and fabric',
      image: '/assets/about/banner-3.png',
      title: 'Aari embroidery kits',
      description: 'Find threads, Aari needles, beads and accessories to help bring embroidery ideas to life.',
    },
    {
      alt: 'Aari embroidery materials including threads, needles, stones and beads',
      image: '/assets/about/banner-1.png',
      title: 'Aari embroidery materials',
      description: 'Explore essential materials for detailed Aari work, from colourful threads to decorative accents.',
    },
    {
      alt: 'Colourful beads, pearls and stones for Aari work',
      image: '/assets/about/banner-2.png',
      title: 'Beads, pearls and stones',
      description: 'Add colour, texture and a decorative finish to embroidery with beads, pearls and stones.',
    },
    {
      alt: 'Aari embroidery materials and tailoring supplies banner',
      image: '/assets/about/banner-4.png',
      title: 'Creative textile supplies',
      description: 'Browse embroidery and tailoring supplies for a variety of creative projects.',
    },
  ];

  readonly reasons: AboutReason[] = [
    {
      title: 'A variety of materials',
      description: 'Find supplies for Aari embroidery, embellishment, tailoring and more in one place.',
      icon: 'bi bi-grid',
    },
    {
      title: 'Convenient online shopping',
      description: 'Browse the store online and explore materials for your next project.',
      icon: 'bi bi-bag',
    },
    {
      title: 'Real customer support',
      description: 'Reach the Yaas Bridal Store team by phone or email when you need assistance.',
      icon: 'bi bi-chat-heart',
    },
    {
      title: 'Clear order information',
      description: 'Review shipping information and charges during checkout before placing an order.',
      icon: 'bi bi-truck',
    },
  ];
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About } from './about';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses base-href-relative paths for all About page banners', () => {
    expect(component.banners.map(banner => banner.image)).toEqual([
      'assets/about/banner-3.png',
      'assets/about/banner-1.png',
      'assets/about/banner-2.png',
      'assets/about/banner-4.png',
    ]);
  });

  it('shows the requested About page content and verified contact details', () => {
    const pageText = fixture.nativeElement.textContent as string;

    expect(pageText).toContain('About Aari Materials');
    expect(pageText).toContain('Your Destination for Beautiful Aari Embroidery Materials.');
    expect(pageText).toContain('OUR STORY');
    expect(pageText).toContain('Materials for every detail.');
    expect(fixture.nativeElement.querySelectorAll('.about-offer-card')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('.about-offer-card img')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('.about-offer-card p')).toHaveLength(4);
    expect(pageText).toContain('WHY SHOP WITH US');
    expect(pageText).toContain('OUR MISSION');
    expect(pageText).toContain('OUR VISION');
    expect(pageText).toContain('Kamaraj Rd, Puspa Nagar, Tiruppur, Tamil Nadu 641604');
    expect(pageText).toContain('+91 96885 26199');
    expect(pageText).toContain('info@tamilanproducts.in');
  });
});

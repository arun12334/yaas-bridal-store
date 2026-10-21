import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows Jewellery Making Material in the main navigation', () => {
    fixture.detectChanges();

    const mainNavigationLinks = fixture.nativeElement.querySelectorAll(
      '.c324700-SHARED-998412-desktop-nav-link',
    ) as NodeListOf<HTMLAnchorElement>;

    expect(
      Array.from(mainNavigationLinks).some(link => link.textContent?.trim() === 'Jewellery Making Material'),
    ).toBe(true);
  });
});

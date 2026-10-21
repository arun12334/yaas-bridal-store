import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { Breadcrumb } from './breadcrumb';

@Component({ template: '' })
class TestRoute {}

describe('Breadcrumb', () => {
  let fixture: ComponentFixture<Breadcrumb>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumb],
      providers: [provideRouter([{ path: '**', component: TestRoute }])],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Breadcrumb);
    fixture.detectChanges();
  });

  it('shows the selected brooch category from the query string', async () => {
    await router.navigateByUrl('/brooch-materials-view?q=Petals');
    fixture.detectChanges();

    const breadcrumb = fixture.nativeElement.textContent as string;
    expect(breadcrumb).toContain('Home');
    expect(breadcrumb).toContain('Brooch Material');
    expect(breadcrumb).toContain('Petals');
    expect(breadcrumb).not.toContain('Flowers');
  });

  it('shows the selected flower name from the product id', async () => {
    await router.navigateByUrl('/brooch-materials-full-view?id=2');
    fixture.detectChanges();

    const breadcrumb = fixture.nativeElement.textContent as string;
    expect(breadcrumb).toContain('Brooch Material');
    expect(breadcrumb).toContain('Flowers');
    expect(breadcrumb).toContain('Brooch Flower (White)');
  });

  it('shows breadcrumbs for each main navigation page', async () => {
    const routes = [
      ['/combo-pack', 'Combo Pack'],
      ['/tailoring-material', 'Tailoring Material'],
      ['/aari-material', 'Aari Material'],
      ['/kundan-stone-fitting-stone', 'Kundan Stone / Fitting Stone'],
      ['/jewellery-making-material', 'Jewellery Making Material'],
      ['/artificial-flower-making-material', 'Artificial Flower Making Material'],
      ['/brooch-material', 'Brooch Material'],
      ['/packing-materials', 'Packing Materials'],
    ];

    for (const [url, label] of routes) {
      await router.navigateByUrl(url);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(label);
    }
  });
});

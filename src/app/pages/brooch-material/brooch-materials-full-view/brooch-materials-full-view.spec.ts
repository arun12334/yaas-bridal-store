import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { BroochMaterialsFullView } from './brooch-materials-full-view';

describe('BroochMaterialsFullView', () => {
  let component: BroochMaterialsFullView;
  let fixture: ComponentFixture<BroochMaterialsFullView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BroochMaterialsFullView],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap: of(convertToParamMap({ id: '3' })) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BroochMaterialsFullView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the selected flower and updates the price when pack size changes', () => {
    fixture.detectChanges();

    expect(component.flower()?.name).toBe('Brooch Flower (Lt.Purple)');
    expect(fixture.nativeElement.textContent).toContain('Brooch Flower (Lt.Purple)');
    expect(fixture.nativeElement.querySelector('.brooch-full-view-image img')?.getAttribute('alt'))
      .toBe('Brooch Flower (Lt.Purple)');
    expect(component.selectedPack().price).toBe(25);

    const packSelect = fixture.nativeElement.querySelector('#brooch-full-view-pack') as HTMLSelectElement;
    packSelect.value = '30';
    packSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectedPack().price).toBe(65);
    expect(fixture.nativeElement.textContent).toContain('₹65.00');
  });

  it('adds the selected flower pack and quantity to the cart', () => {
    fixture.detectChanges();
    const packSelect = fixture.nativeElement.querySelector('#brooch-full-view-pack') as HTMLSelectElement;
    packSelect.value = '30';
    packSelect.dispatchEvent(new Event('change'));
    component.quantity.set(2);
    component.addToCart();

    const cartLine = component.store.cart().find(line => line.product.id === 10031);
    expect(cartLine?.product.name).toBe('Brooch Flower (Lt.Purple) - 30g');
    expect(cartLine?.quantity).toBe(2);
  });
});

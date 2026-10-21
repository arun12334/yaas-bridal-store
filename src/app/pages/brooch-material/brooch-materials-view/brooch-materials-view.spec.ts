import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { BroochMaterialsView } from './brooch-materials-view';

describe('BroochMaterialsView', () => {
  let component: BroochMaterialsView;
  let fixture: ComponentFixture<BroochMaterialsView>;
  let queryParamMap: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    queryParamMap = new BehaviorSubject(convertToParamMap({ q: 'Flowers' }));
    await TestBed.configureTestingModule({
      imports: [BroochMaterialsView],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BroochMaterialsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the Flowers catalog and its 12 products for the Flowers query', () => {
    fixture.detectChanges();

    expect(component.categoryName()).toBe('Flowers');
    expect(component.isFlowersCategory()).toBe(true);
    expect(component.flowers).toHaveLength(12);
    expect(fixture.nativeElement.textContent).toContain('Brooch Flower (Rani Pink)');
    expect(fixture.nativeElement.textContent).toContain('Brooch Flower (Yellow)');
    expect(fixture.nativeElement.textContent).not.toContain('in stock');
  });

  it('adds the selected flower pack and matching price to the cart', () => {
    component.setPackWeight(1, '30');
    component.addFlowerToCart(component.flowers[0]);

    const cartLine = component.store.cart()[0];
    expect(cartLine.product.name).toBe('Brooch Flower (Rani Pink) - 30g');
    expect(cartLine.product.price).toBe(65);
  });

  it('toggles a flower in the wishlist from its circular heart button', () => {
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('.brooch-flower-wish');
    expect(buttons).toHaveLength(12);
    expect(buttons[0].getAttribute('aria-label')).toBe('Add to wishlist');

    buttons[0].click();
    fixture.detectChanges();

    expect(component.store.isWishlisted(component.flowerProductId(component.flowers[0]))).toBe(true);
    expect(buttons[0].getAttribute('aria-label')).toBe('Remove from wishlist');
  });
});

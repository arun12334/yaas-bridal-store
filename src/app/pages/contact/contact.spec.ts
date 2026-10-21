import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the Google Maps location in the contact card', () => {
    fixture.detectChanges();

    const map = fixture.nativeElement.querySelector(
      '.c815204-CONTACT-579136-US-contact-map',
    ) as HTMLIFrameElement | null;

    expect(map).not.toBeNull();
    expect(map?.src).toContain('google.com/maps/embed');
    expect(map?.title).toContain('Coimbatore');
  });
});

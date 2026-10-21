import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Registration } from './registration';

describe('Registration', () => {
  let component: Registration;
  let fixture: ComponentFixture<Registration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registration],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Registration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reports when the passwords do not match', () => {
    component.details.password = 'secret123';
    component.details.confirmPassword = 'different';

    component.register();

    expect(component.errorMessage()).toContain('do not match');
    expect(component.successMessage()).toBe('');
  });

  it('shows demo success for matching passwords', () => {
    component.details.password = 'secret123';
    component.details.confirmPassword = 'secret123';

    component.register();

    expect(component.errorMessage()).toBe('');
    expect(component.successMessage()).toContain('authentication service');
  });
});

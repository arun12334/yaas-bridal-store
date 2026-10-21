import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the demo login credentials', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('tamil@gmail.com');
    expect(fixture.nativeElement.textContent).toContain('123456');
  });

  it('rejects incorrect credentials', () => {
    component.credentials.email = 'wrong@example.com';
    component.credentials.password = 'wrong';

    component.login();

    expect(component.errorMessage()).toContain('incorrect');
  });

  it('accepts the demo credentials and navigates to the dashboard', async () => {
    const router = TestBed.inject(Router);
    const navigation = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    component.credentials.email = 'tamil@gmail.com';
    component.credentials.password = '123456';

    component.login();
    await fixture.whenStable();

    expect(navigation).toHaveBeenCalledWith('/dashboard');
    expect(component.errorMessage()).toBe('');
  });
});

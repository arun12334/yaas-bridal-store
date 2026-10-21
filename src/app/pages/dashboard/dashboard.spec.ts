import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows six trending Aari material cards and the supplied video', () => {
    fixture.detectChanges();

    expect(component.trendingMaterials).toHaveLength(6);
    expect(component.trendingMaterials.every(material => material.route === '/aari-material')).toBe(true);
    expect(component.trendingVideo).toBe('assets/videos/aari-video.mp4');
    expect(fixture.nativeElement.querySelectorAll('.dashboard-trending-card')).toHaveLength(6);
    expect(fixture.nativeElement.querySelector('.dashboard-trending-video video')).toBeTruthy();
  });

});

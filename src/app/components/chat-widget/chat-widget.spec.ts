import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWidget } from './chat-widget';

describe('ChatWidget', () => {
  let fixture: ComponentFixture<ChatWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWidget);
    await fixture.whenStable();
  });

  it('opens and closes the chat panel', () => {
    fixture.detectChanges();

    const launcher = fixture.nativeElement.querySelector('.dashboard-chat-launcher') as HTMLButtonElement;
    launcher.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dashboard-chat-panel')).toBeTruthy();

    launcher.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dashboard-chat-panel')).toBeNull();
  });
});

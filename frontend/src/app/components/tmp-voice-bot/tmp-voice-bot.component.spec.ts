import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpVoiceBotComponent } from './tmp-voice-bot.component';

describe('TmpVoiceBotComponent', () => {
  let component: TmpVoiceBotComponent;
  let fixture: ComponentFixture<TmpVoiceBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmpVoiceBotComponent]
    });
    fixture = TestBed.createComponent(TmpVoiceBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

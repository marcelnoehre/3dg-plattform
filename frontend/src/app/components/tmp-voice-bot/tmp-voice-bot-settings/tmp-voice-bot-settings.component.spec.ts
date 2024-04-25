import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpVoiceBotSettingsComponent } from './tmp-voice-bot-settings.component';

describe('TmpVoiceBotSettingsComponent', () => {
  let component: TmpVoiceBotSettingsComponent;
  let fixture: ComponentFixture<TmpVoiceBotSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmpVoiceBotSettingsComponent]
    });
    fixture = TestBed.createComponent(TmpVoiceBotSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpVoiceBotChannelSettingsComponent } from './tmp-voice-bot-channel-settings.component';

describe('TmpVoiceBotChannelSettingsComponent', () => {
  let component: TmpVoiceBotChannelSettingsComponent;
  let fixture: ComponentFixture<TmpVoiceBotChannelSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmpVoiceBotChannelSettingsComponent]
    });
    fixture = TestBed.createComponent(TmpVoiceBotChannelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

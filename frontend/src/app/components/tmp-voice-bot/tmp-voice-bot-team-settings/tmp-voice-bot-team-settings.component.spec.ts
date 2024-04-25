import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpVoiceBotTeamSettingsComponent } from './tmp-voice-bot-team-settings.component';

describe('TmpVoiceBotTeamSettingsComponent', () => {
  let component: TmpVoiceBotTeamSettingsComponent;
  let fixture: ComponentFixture<TmpVoiceBotTeamSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmpVoiceBotTeamSettingsComponent]
    });
    fixture = TestBed.createComponent(TmpVoiceBotTeamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

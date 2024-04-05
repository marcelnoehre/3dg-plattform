import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tmp-voice-bot-team-settings',
  templateUrl: './tmp-voice-bot-team-settings.component.html',
  styleUrls: ['./tmp-voice-bot-team-settings.component.scss']
})
export class TmpVoiceBotTeamSettingsComponent implements OnInit {
  initTeams: any[] = [];
  teams: any[] = [];

  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _error: ErrorService
  ) { }
  
  async ngOnInit(): Promise<void> {
    try {
      const teams = await lastValueFrom(this._api.getTeamsTmpVoiceBot(this._user.token));
      this.initTeams = teams;
      this.teams = teams;
    } catch (error) {
      this._error.handleApiError(error);
    }
  }

}

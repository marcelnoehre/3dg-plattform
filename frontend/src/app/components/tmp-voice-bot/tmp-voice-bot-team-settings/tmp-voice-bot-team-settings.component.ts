import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  teams: any[] = [];

  constructor(
		private _dialogRef: MatDialogRef<TmpVoiceBotTeamSettingsComponent>,
    private _api: ApiService,
    private _user: UserService,
    private _error: ErrorService
  ) { }
  
  async ngOnInit(): Promise<void> {
    try {
      const data = await lastValueFrom(this._api.getTeamsTmpVoiceBot(this._user.token));
      this.teams = data.teams;
      this.teams.pop();
    } catch (error) {
      this._error.handleApiError(error);
    }
  }

  public closeDialog(): void {
		this._dialogRef.close(false);
	}

}

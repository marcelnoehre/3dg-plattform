import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tmp-voice-bot-team-settings',
  templateUrl: './tmp-voice-bot-team-settings.component.html',
  styleUrls: ['./tmp-voice-bot-team-settings.component.scss']
})
export class TmpVoiceBotTeamSettingsComponent implements OnInit {
  teams: any[] = [];
  name: string = '';
  id: string = '';

  constructor(
		private _dialogRef: MatDialogRef<TmpVoiceBotTeamSettingsComponent>,
    private _api: ApiService,
    private _user: UserService,
    private _error: ErrorService,
    private _snackbar: SnackbarService
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

  disable(): boolean {
    return !this.name.length || !this.id.length;
  }

  async addTeam(): Promise<void> {
    try {
      const team = {
        name: this.name,
        id: this.id
      };
      const response = await lastValueFrom(this._api.addTeamTmpVoiceBot(this._user.token, team));
      this.teams.splice(this.teams.length - 1, 0, team);
      this.name = '';
      this.id = '';
      this._snackbar.open(response.message);
    } catch (error) {
      this._error.handleApiError(error);
    }
  }

  async deleteTeam(id: string): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.deleteTeamTmpVoiceBot(this._user.token, id));
      this.teams = this.teams.filter(team => team.id !== id);
      this._snackbar.open(response.message);
    } catch (error) {
      this._error.handleApiError(error);
    }
  }

}

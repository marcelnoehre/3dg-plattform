import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tmp-voice-bot-settings',
  templateUrl: './tmp-voice-bot-settings.component.html',
  styleUrls: ['./tmp-voice-bot-settings.component.scss']
})
export class TmpVoiceBotSettingsComponent implements OnInit {
  initPath: string = '';
  path: string = '';

  constructor(
		private _dialogRef: MatDialogRef<TmpVoiceBotSettingsComponent>,
    private _api: ApiService,
    private _user: UserService,
    private _error: ErrorService,
    private _snackbar: SnackbarService
	) { }

  async ngOnInit(): Promise<void> {
    try {
      const path = await lastValueFrom(this._api.getFileTmpVoiceBot(this._user.token));
      this.initPath = path;
      this.path = path;
    } catch (error) {
      this._error.handleApiError(error);
    }
  }

  public closeDialog(): void {
		this._dialogRef.close(false);
	}

  public async updatePath() {
    try {
      const response = await lastValueFrom(this._api.updatePathTmpVoiceBot(this._user.token, this.path));
      this.initPath = this.path;
      this._snackbar.open(response.message);
    } catch (error) {
      this._error.handleApiError(error);
    }
  }

  public disablePath(): boolean {
    return this.path === this.initPath;
  }

}

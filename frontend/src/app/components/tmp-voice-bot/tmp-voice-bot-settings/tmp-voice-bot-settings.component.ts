import { Component } from '@angular/core';
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
export class TmpVoiceBotSettingsComponent {
  path: string = '';

  constructor(
		private _dialogRef: MatDialogRef<TmpVoiceBotSettingsComponent>,
    private _api: ApiService,
    private _user: UserService,
    private _error: ErrorService,
    private _snackbar: SnackbarService
	) { }

  public closeDialog(): void {
		this._dialogRef.close(false);
	}

  public async updatePath() {
    try {
      const response = await lastValueFrom(this._api.updatePathTmpVoiceBot(this._user.token, this.path));
      this._snackbar.open(response.message);
      this._dialogRef.close(true);
    } catch (error) {
      this._error.handleApiError(error);
    }
  }

}

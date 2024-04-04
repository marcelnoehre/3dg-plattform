import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tmp-voice-bot',
  templateUrl: './tmp-voice-bot.component.html',
  styleUrls: ['./tmp-voice-bot.component.scss']
})
export class TmpVoiceBotComponent {

  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _snackbar: SnackbarService,
    private _error: ErrorService
  ) {

  }
  
  async startBot(): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.startTmpVoiceBot(this._user.token));
      this._snackbar.open(response.message);
    } catch (error) {
			this._error.handleApiError(error);
		}
  }

}

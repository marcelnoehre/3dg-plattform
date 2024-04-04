import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
export class TmpVoiceBotComponent implements AfterViewInit {
  @ViewChild('console', {static: false}) consoleElement!: ElementRef;
  consoleOutput = [];

  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _snackbar: SnackbarService,
    private _error: ErrorService
  ) {

  }
  
  ngAfterViewInit() {
    try {
      this.consoleElement.nativeElement.scrollTop = this.consoleElement.nativeElement.scrollHeight;
    } catch(err) { }
  }
  
  async startBot(): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.startTmpVoiceBot(this._user.token));
      this._snackbar.open(response.message);
    } catch (error) {
			this._error.handleApiError(error);
		}
  }

  async restartBot(): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.restartTmpVoiceBot(this._user.token));
      this._snackbar.open(response.message);
    } catch (error) {
			this._error.handleApiError(error);
		}
  }

  async stopBot(): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.stopTmpVoiceBot(this._user.token));
      this._snackbar.open(response.message);
    } catch (error) {
			this._error.handleApiError(error);
		}
  }

}

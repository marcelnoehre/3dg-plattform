import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tmp-voice-bot-channel-settings',
  templateUrl: './tmp-voice-bot-channel-settings.component.html',
  styleUrls: ['./tmp-voice-bot-channel-settings.component.scss']
})
export class TmpVoiceBotChannelSettingsComponent implements OnInit {
  initCategory: string = '';
  initChannel: string = '';
  category: string = '';
  channel: string = '';

  constructor(
		private _dialogRef: MatDialogRef<TmpVoiceBotChannelSettingsComponent>,
    private _api: ApiService,
    private _user: UserService,
    private _error: ErrorService

	) { }

  async ngOnInit(): Promise<void> {
    try {
      const data = await lastValueFrom(this._api.getChannelSettingsTmpVoiceBot(this._user.token));
      this.initCategory = data.teamParent;
      this.initChannel = data.teamCreate;
      this.category = data.teamParent;
      this.channel = data.teamCreate;
    } catch (error) {
      this._error.handleApiError(error);
    }
  }
  
  public closeDialog(): void {
		this._dialogRef.close(false);
	}

  disableCategory(): boolean {
    return this.category === this.initCategory;
  }

  disableChannel(): boolean {
    return this.channel === this.initChannel;
  }

}

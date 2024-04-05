import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tmp-voice-bot-channel-settings',
  templateUrl: './tmp-voice-bot-channel-settings.component.html',
  styleUrls: ['./tmp-voice-bot-channel-settings.component.scss']
})
export class TmpVoiceBotChannelSettingsComponent {
  category: string = '';
  channel: string = '';

  constructor(
		private _dialogRef: MatDialogRef<TmpVoiceBotChannelSettingsComponent>
	) { }
  
  public closeDialog(): void {
		this._dialogRef.close(false);
	}

}

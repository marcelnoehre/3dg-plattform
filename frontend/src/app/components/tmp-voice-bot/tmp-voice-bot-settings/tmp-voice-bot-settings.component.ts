import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tmp-voice-bot-settings',
  templateUrl: './tmp-voice-bot-settings.component.html',
  styleUrls: ['./tmp-voice-bot-settings.component.scss']
})
export class TmpVoiceBotSettingsComponent {

  constructor(
		private _dialogRef: MatDialogRef<TmpVoiceBotSettingsComponent>,
	) { }

  public closeDialog(res: boolean): void {
		this._dialogRef.close(res);
	}

}

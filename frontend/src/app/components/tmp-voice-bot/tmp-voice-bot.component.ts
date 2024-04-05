import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Permission } from 'src/app/enums/permission.enum';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { TmpVoiceBotSettingsComponent } from './tmp-voice-bot-settings/tmp-voice-bot-settings.component';
import { TmpVoiceBotChannelSettingsComponent } from './tmp-voice-bot-channel-settings/tmp-voice-bot-channel-settings.component';
import { TmpVoiceBotTeamSettingsComponent } from './tmp-voice-bot-team-settings/tmp-voice-bot-team-settings.component';

@Component({
  selector: 'app-tmp-voice-bot',
  templateUrl: './tmp-voice-bot.component.html',
  styleUrls: ['./tmp-voice-bot.component.scss']
})
export class TmpVoiceBotComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('console', {static: false}) consoleElement!: ElementRef;
  consoleOutput: string[] = [];
  pendingChanges: boolean = false;
  isRunning: boolean = false;
  syncInterval: any;

  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _snackbar: SnackbarService,
    private _error: ErrorService,
    private _dialog: MatDialog,
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.syncData();
    this.syncInterval = setInterval(async () => {
			await this.syncData();
		}, 2000);
  }
  
  ngAfterViewInit() {
    try {
      this.consoleElement.nativeElement.scrollTop = this.consoleElement.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngOnDestroy(): void {
    clearInterval(this.syncInterval);
  }

  async syncData(): Promise<void> {
    const data = await lastValueFrom(this._api.getConsoleOutputTmpVoiceBot(this._user.token));
    this.consoleOutput = data.consoleOutput;
    this.pendingChanges = data.pendingChanges;
    this.isRunning = data.isRunning;
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

  canShowSettings(): boolean {
    return this._user.permission === Permission.HEAD_ADMIN;
  }

  showSettings(): void {
    this._dialog.open(TmpVoiceBotSettingsComponent).afterClosed().subscribe(() => { });
  }

  showChannelSettings(): void {
    this._dialog.open(TmpVoiceBotChannelSettingsComponent).afterClosed().subscribe(() => { });
  }

  showTeamsSettings(): void {
    this._dialog.open(TmpVoiceBotTeamSettingsComponent).afterClosed().subscribe(() => { });
  }

}

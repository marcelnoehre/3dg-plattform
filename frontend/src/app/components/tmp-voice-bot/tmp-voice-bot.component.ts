import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Permission } from 'src/app/enums/permission.enum';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tmp-voice-bot',
  templateUrl: './tmp-voice-bot.component.html',
  styleUrls: ['./tmp-voice-bot.component.scss']
})
export class TmpVoiceBotComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('console', {static: false}) consoleElement!: ElementRef;
  consoleOutput: string[] = [];
  syncInterval: any;

  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _snackbar: SnackbarService,
    private _error: ErrorService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.startConsole();
  }
  
  ngAfterViewInit() {
    try {
      this.consoleElement.nativeElement.scrollTop = this.consoleElement.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngOnDestroy(): void {
    this.stopConsole();
  }

  async startConsole(): Promise<void> {
    await this.syncData();
    this.syncInterval = setInterval(async () => {
			await this.syncData();
		}, 5000);
  }

  async stopConsole(): Promise<void> {
    clearInterval(this.syncInterval);
    this.consoleOutput = [];
  }

  async syncData(): Promise<void> {
    this.consoleOutput = await lastValueFrom(this._api.getConsoleOutputTmpVoiceBot(this._user.token));
  }
  
  async startBot(): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.startTmpVoiceBot(this._user.token));
      await this.startConsole();
      this._snackbar.open(response.message);
    } catch (error) {
			this._error.handleApiError(error);
		}
  }

  async restartBot(): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.restartTmpVoiceBot(this._user.token));
      await this.stopConsole();
      await this.startConsole();
      this._snackbar.open(response.message);
    } catch (error) {
			this._error.handleApiError(error);
		}
  }

  async stopBot(): Promise<void> {
    try {
      const response = await lastValueFrom(this._api.stopTmpVoiceBot(this._user.token));
      await this.stopConsole();
      this._snackbar.open(response.message);
    } catch (error) {
			this._error.handleApiError(error);
		}
  }

  showSettings(): boolean {
    return this._user.permission === Permission.HEAD_ADMIN;
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestType } from '../enums/request-type.enum';
import { User } from '../interfaces/user.interface';
import { RequestService } from './request.service';
import { RequestPath } from '../enums/request-path.enum';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	private _basePath = 'http://localhost:3000/';

	constructor(
		private request: RequestService
	) { }

	// ### AUTH ###
	public verify(token: string): Observable<User> {
		const query = {
			token: token
		};
		return this.request.send<User>(RequestType.GET, this._basePath + RequestPath.VERIFY, query);
	}

  	public login(username: string, password: string): Observable<User> {
		const body = {
			username: username,
      		password: password
		};
		return this.request.send<User>(RequestType.POST, this._basePath + RequestPath.LOGIN, body);
	}

	public createUser(token: string, username: string, permission: string): Observable<ApiResponse> {
		const body = {
			token: token,
			username: username,
      		permission: permission
		};
		return this.request.send<ApiResponse>(RequestType.POST, this._basePath + RequestPath.CREATE_USER, body);
	}

	public updateUsername(token: string, username: string): Observable<ApiResponse> {
		const body = {
			token: token,
			username: username
		};
		return this.request.send<ApiResponse>(RequestType.PUT, this._basePath + RequestPath.UPDATE_USERNAME, body);
	}

	public updatePassword(token: string, password: string): Observable<ApiResponse> {
		const body = {
			token: token,
			password: password
		};
		return this.request.send<ApiResponse>(RequestType.PUT, this._basePath + RequestPath.UPDATE_PASSWORD, body);
	}

	// ### TMP VOICE BOT ###
	public getConsoleOutputTmpVoiceBot(token: string): Observable<any> {
		const body = {
			token: token
		};
		return this.request.send<any>(RequestType.GET, this._basePath + RequestPath.GET_CONSOLE_TMP_VOICE_BOT, body);
	}

	public getFileTmpVoiceBot(token: string): Observable<string> {
		const body = {
			token: token
		};
		return this.request.send<string>(RequestType.GET, this._basePath + RequestPath.GET_FILE_TMP_VOICE_BOT, body);
	}

	public getTeamsTmpVoiceBot(token: string): Observable<any> {
		const body = {
			token: token
		};
		return this.request.send<any>(RequestType.GET, this._basePath + RequestPath.GET_TEAMS_TMP_VOICE_BOT, body);
	}

	public getChannelSettingsTmpVoiceBot(token: string): Observable<any> {
		const body = {
			token: token
		};
		return this.request.send<any>(RequestType.GET, this._basePath + RequestPath.GET_CHANNEL_SETTINGS_TMP_VOICE_BOT, body);
	}

	public startTmpVoiceBot(token: string): Observable<ApiResponse> {
		const body = {
			token: token
		};
		return this.request.send<ApiResponse>(RequestType.POST, this._basePath + RequestPath.START_TMP_VOICE_BOT, body);
	}

	public restartTmpVoiceBot(token: string): Observable<ApiResponse> {
		const body = {
			token: token
		};
		return this.request.send<ApiResponse>(RequestType.POST, this._basePath + RequestPath.RESTART_TMP_VOICE_BOT, body);
	}

	public stopTmpVoiceBot(token: string): Observable<ApiResponse> {
		const body = {
			token: token
		};
		return this.request.send<ApiResponse>(RequestType.POST, this._basePath + RequestPath.STOP_TMP_VOICE_BOT, body);
	}

	public updatePathTmpVoiceBot(token: string, path: string) {
		const body = {
			token: token,
			path: path
		};
		return this.request.send<ApiResponse>(RequestType.PUT, this._basePath + RequestPath.UPDATE_PATH_TMP_VOICE_BOT, body);
	}

	public updateChannelSettingsTmpVoiceBot(token: string, attribute: string, value: string) {
		const body = {
			token: token,
			attribute: attribute,
			value: value
		};
		return this.request.send<ApiResponse>(RequestType.PUT, this._basePath + RequestPath.UPDATE_CHANNEL_SETTINGS_TMP_VOICE_BOT, body);
	}
}

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
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestType } from '../enums/request-type.enum';
import { User } from '../interfaces/user.interface';
import { RequestService } from './request.service';
import { RequestPath } from '../enums/request-path.enum';

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
}

import { Injectable } from '@angular/core';
import { Permission } from '../enums/permission.enum';
import { User } from '../interfaces/user.interface';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private _permissions: Permission[] = [Permission.ADMIN, Permission.HEAD_ADMIN];
	private _user: User = {
    token: '',
    username: '',
    color: '',
    permission: Permission.NONE,
    isLoggedIn: false
	};

	public get user(): User {
		return this._user;
	}

	public get token(): string {
		return this._user.token;
	}

	public get username(): string {
		return this._user.username;
	}

	public get color(): string {
		return this._user.color;
	}

	public get permission(): Permission {
		return this._user.permission;
	}

	public get isLoggedIn(): boolean {
		return this._user.isLoggedIn;
	}

	public set user(user: User) {
		this._user = user;
	}

	public set token(token: string) {
		this._user.token = token;
	}

	public set username(username: string) {
		this._user.username = username;
	}

	public set color(color: string) {
		this._user.color = color;
	}

	public set permission(permission: Permission) {
		this._user.permission = permission;
	}

	public set isLoggedIn(isLoggedIn: boolean) {
		this._user.isLoggedIn = isLoggedIn;
	}

	public update(attribute: string, value: string): void {
		this._user[attribute] = value;
	}

	public hasPermission(required: Permission): boolean {
		return this._permissions.indexOf(this.permission as Permission) >= this._permissions.indexOf(required);
	}
}
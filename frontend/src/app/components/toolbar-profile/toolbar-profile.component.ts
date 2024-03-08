import { Component, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
	selector: 'app-toolbar-profile',
	templateUrl: './toolbar-profile.component.html',
	styleUrls: ['./toolbar-profile.component.scss']
})
export class ToolbarProfileComponent {
	@ViewChild('menu', { static: false })	menu!: MatMenu;

	public username = '';
	public profilePicture = '';
	public initials = '';

	constructor(
		private _router: Router,
		private _storage: StorageService,
		private _user: UserService,
		private _device: DeviceService
	) {
		this.username = this._user.username;
		this.initials = this._user.username.charAt(0);
	}

	public logout(): void {
		this._storage.clearSession();
		this._user.user = this._storage.getSessionEntry('user');
		this._router.navigateByUrl('/login');
	}

	public isSmallScreen(): boolean {
		return this._device.isSmallScreen();
	}
}
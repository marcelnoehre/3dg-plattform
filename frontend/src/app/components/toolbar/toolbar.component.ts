import { Component, EventEmitter, Output } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
	@Output() sidenavClickEvent = new EventEmitter<void>();

	constructor(
		private _user: UserService,
		private _device: DeviceService
	) { }

	public toggleSidenav(): void {
		this.sidenavClickEvent.emit();
	}

	public hideSidenav(): boolean {
		return this._device.activeRoute === '/';
	}

	public isLoggedIn(): boolean {
		return this._user.isLoggedIn;
	}
}
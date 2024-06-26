import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { AppColor } from 'src/app/enums/app-color.enum';
import { AppIcon } from 'src/app/enums/app-icon.enum';
import { AppItem } from 'src/app/enums/app-item.enum';
import { AppRoute } from 'src/app/enums/app-route.enum';
import { Permission } from 'src/app/enums/permission.enum';
import { App } from 'src/app/interfaces/app.interface';
import { ApiService } from 'src/app/services/api.service';
import { DeviceService } from 'src/app/services/device.service';
import { ErrorService } from 'src/app/services/error.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
	@ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
	
	private _clickEvent$!: Subscription;
	public isExpanded = false;
	public appItems: App[] = [
		{
			item: AppItem.DASHBOARD,
			icon: AppIcon.DASHBOARD,
			route: AppRoute.DASHBOARD,
			color: AppColor.DASHBOARD,
			permission: Permission.NONE
		},
		{
			item: AppItem.TMP_VOICE_BOT,
			route: AppRoute.TMP_VOICE_BOT,
			icon: AppIcon.TMP_VOICE_BOT,
			color: AppColor.TMP_VOICE_BOT,
			permission: Permission.ADMIN
		}
	];
	public settingsItems: App[] = [
		{
			item: AppItem.CREATE_USER,
			route: AppRoute.CREATE_USER,
			icon: AppIcon.CREATE_USER,
			color: AppColor.CREATE_USER,
			permission: Permission.HEAD_ADMIN
		},
		{
			item: AppItem.ACCOUNT_SETTINGS,
			route: AppRoute.ACCOUNT_SETTINGS,
			icon: AppIcon.ACCOUNT_SETTINGS,
			color: AppColor.ACCOUNT_SETTINGS,
			permission: Permission.NONE
		}
	]

	constructor(
		private _storage: StorageService,
		private _event: EventService,
		private _api: ApiService,
		private _user: UserService,
		private _device: DeviceService,
		private _error: ErrorService,
		private _router: Router
	) {
	}

	async ngOnInit(): Promise<void> {
		this._user.user = this._storage.getSessionEntry('user');
		if (this.isLoggedIn()) {
			try {
				const user = await lastValueFrom(this._api.verify(this._user.token));
				this._storage.setSessionEntry('user', user);
				this._user.user = user;
				this._user.isLoggedIn = true;
			} catch (error) {
				this._error.handleApiError(error);
			}
		}
		this._clickEvent$ = this._event.documentClick$.subscribe((target) => {			
			if (this.isExpanded && !['mat-mdc-nav-list', 'mat-mdc-button-touch-target'].some(cls => target.classList.contains(cls))) this.toggleSidebar(false);
			if (!this.isExpanded && target.classList.contains('mat-mdc-nav-list')) this.toggleSidebar(true);
		});
	}

	ngOnDestroy(): void {
		if (this._clickEvent$) this._clickEvent$.unsubscribe();
	}

	public toggleSidebar(newState?: boolean): void {
		this.isExpanded = newState !== undefined ? newState : !this.isExpanded;
	}

	public hideSidenav(): boolean {
		return this._device.activeRoute === '/';
	}

	public sidenavSize(): string {
		if (this._device.isSmallScreen()) {
			return this.isExpanded ? 'w-100' : 'hide-sidenav';
		} else {
			return '';
		}	
	}

	public isLoggedIn(): boolean {
		return this._user.isLoggedIn;
	}

	public isActive(route: string): string {
		return route === this._device.activeRoute  ? 'active-route' : '';
	}

	public showBackground(): boolean {
		return this._device.activeRoute === '/login' || this._device.activeRoute === '/registration';
	}

	public hasPermission(permission: Permission): boolean {
		return this._user.hasPermission(permission);
	}

	public redirectTo(route: string): void {
		this._router.navigateByUrl(route);
	}
}
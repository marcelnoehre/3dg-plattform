import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppColor } from 'src/app/enums/app-color.enum';
import { AppIcon } from 'src/app/enums/app-icon.enum';
import { AppItem } from 'src/app/enums/app-item.enum';
import { AppRoute } from 'src/app/enums/app-route.enum';
import { Permission } from 'src/app/enums/permission.enum';
import { App } from 'src/app/interfaces/app.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	constructor(
		private _router: Router,
		private _user: UserService
	) { }

	public appItems: App[][] = [
		[
			{
				item: AppItem.TMP_VOICE_BOT,
				route: AppRoute.TMP_VOICE_BOT,
				icon: AppIcon.TMP_VOICE_BOT,
				color: AppColor.TMP_VOICE_BOT,
				permission: Permission.ADMIN
			}
		],
		[
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
	];

	public redirectTo(route: string): void {
		this._router.navigateByUrl(route);
	}

	public hasPermission(permission: Permission): boolean {
		return this._user.hasPermission(permission);
	}
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppColor } from 'src/app/enums/app-color.enum';
import { AppIcon } from 'src/app/enums/app-icon.enum';
import { AppItem } from 'src/app/enums/app-item.enum';
import { AppRoute } from 'src/app/enums/app-route.enum';
import { App } from 'src/app/interfaces/app.interface';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	constructor(
		private _router: Router
	) { }

	public appItems: App[][] = [
		[
			{
				item: AppItem.TMP_VOICE_BOT,
				route: AppRoute.TMP_VOICE_BOT,
				icon: AppIcon.TMP_VOICE_BOT,
				color: AppColor.TMP_VOICE_BOT
			}
		],
		[
			{
				item: AppItem.CREATE_USER,
				route: AppRoute.CREATE_USER,
				icon: AppIcon.CREATE_USER,
				color: AppColor.CREATE_USER
			}
		]
	];

	public redirectTo(route: string): void {
		this._router.navigateByUrl(route);
	}
}
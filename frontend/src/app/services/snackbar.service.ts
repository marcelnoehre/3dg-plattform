import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarType } from '../enums/snackbar-type.enum';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
	constructor(
		private _zone: NgZone,
		private _snackbar: MatSnackBar
	) { }

	public open(message: string, action = 'OK', type: SnackbarType = SnackbarType.INFO, duration = 7000): void {
		this._zone.run(() => this._snackbar.open(message, action, { duration, panelClass: type }));
	}
}
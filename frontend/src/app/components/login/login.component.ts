import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ParserService } from 'src/app/services/parser.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	@ViewChild('inputUser') inputUser!: ElementRef;
	@ViewChild('submitLogin') submitLogin!: MatButton;

	public loginForm!: FormGroup;
	public hidePassword = true;
	public loading = false;

	constructor(
		private _storage: StorageService,
		private _router: Router,
		private _error: ErrorService,
		private _api: ApiService,
		private _user: UserService,
		private _parser: ParserService
	) {
		this._createForm();
	}

	ngOnInit(): void {
		this._user.user = this._storage.getSessionEntry('user');
		if (this._user?.isLoggedIn) {
			this._router.navigateByUrl('/');
		}
		setTimeout(() => this.inputUser.nativeElement.focus());
	}

	private _createForm(): void {
		this.loginForm = new FormGroup(
			{
				usernameFormControl: new FormControl('', { validators: [Validators.required] }),
				passwordFormControl: new FormControl('', { validators: [Validators.required] })
			}, { }
		);
	}

	private get _username(): string {
		return this.loginForm.get('usernameFormControl')?.value;
	}

	private get _password(): string {
		return this.loginForm.get('passwordFormControl')?.value;
	}

	public async login(): Promise<void> {
		this.loading = true;
		try {
			const user = await lastValueFrom(this._api.login(this._username, await this._parser.sha256(this._password)));
			this.loading = false;
			this._user.user = user;
			this._user.isLoggedIn = true;
			this._storage.setSessionEntry('user', this._user.user);
			this._router.navigateByUrl('/');
		} catch (loginError) {
			this.loading = false;
			this._error.handleApiError(loginError);
		}
	}

	public userValid(): boolean {
		return this.loginForm.controls['usernameFormControl'].valid;
	}

	public passwordValid(): boolean {
		return this.loginForm.controls['passwordFormControl'].valid;
	}
}
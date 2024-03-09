import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { EventService } from 'src/app/services/event.service';
import { ParserService } from 'src/app/services/parser.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {

  public accountSettingsForm!: FormGroup;
  public hidePassword = true;
  private _isLoading = '';

  constructor(
		private _api: ApiService,
		private _snackbar: SnackbarService,
		private _user: UserService,
    private _router: Router,
		private _error: ErrorService,
    private _storage: StorageService,
    private _parser: ParserService
	) {
		this._createForm();
	}

  private _createForm(): void {
		this.accountSettingsForm = new FormGroup(
			{
				usernameFormControl: new FormControl('', { validators: [Validators.required] }),
				passwordFormControl: new FormControl('', { validators: [Validators.required] })
			},
			{ }
		);
  }

  
  private get _username(): string {
    return this.accountSettingsForm.get('usernameFormControl')?.value;
  }
  
  private get _password(): string {
    return this.accountSettingsForm.get('passwordFormControl')?.value;
  }

  public isLoading(attribute: string): boolean {
    return this._isLoading === attribute;
  }

	public isDisabled(attribute: string): boolean {
		const value = this.accountSettingsForm.get(attribute + 'FormControl')?.value;
    if (attribute === 'username' && value === this._user.username) return true;
		return !this.accountSettingsForm.get(attribute + 'FormControl')?.valid || value === '' || value === null;
	}

  public hasError(formControl: string): boolean {
		return this.accountSettingsForm.controls[formControl].hasError('required');
	}

  public async updateAttribute(attribute: string): Promise<void> {
    try {
      this._isLoading = attribute;
      let response;
      if (attribute === 'username') {
        response = await lastValueFrom(this._api.updateUsername(this._user.token, this._username));
      } else {
        response = await lastValueFrom(this._api.updatePassword(this._user.token, await this._parser.sha256(this._password)));
      }
      this._isLoading = '';
      this._snackbar.open(response.message);
      this._storage.clearSession();
      this._user.user = this._storage.getSessionEntry('user');
      this._router.navigateByUrl('/login');
    } catch (err) {
			this._isLoading = '';
			this._error.handleApiError(err);
		}
  }

  public async updatePassword(): Promise<void> {
    this._isLoading = 'password';
    this._isLoading = '';
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { EventService } from 'src/app/services/event.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
		private _error: ErrorService,
		private _event: EventService
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

  public async updateUsername(): Promise<void> {
    this._isLoading = 'username';
    this._isLoading = '';
  }

  public async updatePassword(): Promise<void> {
    this._isLoading = 'password';
    this._isLoading = '';
  }

}

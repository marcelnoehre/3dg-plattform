import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Permission } from 'src/app/enums/permission.enum';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  @ViewChild('inputCreateUser') inputCreateUser!: ElementRef;

  public createUserForm!: FormGroup;
  public permissions: Permission[] = [Permission.HEAD_ADMIN, Permission.ADMIN];
  public loading = false;
  
  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _error: ErrorService,
    private _snackbar: SnackbarService
  ) {
		this._createForm();
	}

  ngOnInit(): void {
		setTimeout(() => this.inputCreateUser.nativeElement.focus());
	}

  private _createForm(): void {
		this.createUserForm = new FormGroup(
			{
				usernameFormControl: new FormControl('', { validators: [Validators.required] }),
        permissionFormControl: new FormControl('', { validators: [Validators.required] })
			}, { }
		);
	}

  private get _username(): string {
    return this.createUserForm.controls['usernameFormControl']?.value;
  }

  private get _permission(): string {
    return this.createUserForm.controls['permissionFormControl']?.value;
  }

  public isValid(formControl: string): boolean {
		return this.createUserForm.controls[formControl]?.valid;
	}

  public disableSubmit(): boolean {
    return !this.createUserForm.valid || !this._user.hasPermission(Permission.HEAD_ADMIN);
  }

  public async createUser(): Promise<void> {
    try {
      this.loading = true;
      const response = await lastValueFrom(this._api.createUser(this._user.token, this._username, this._permission));
      this.createUserForm.reset();
      this._snackbar.open(response.message);
      this.loading = false;
    } catch (err) {
			this.loading = false;
			this._error.handleApiError(err);
		}
  }
}

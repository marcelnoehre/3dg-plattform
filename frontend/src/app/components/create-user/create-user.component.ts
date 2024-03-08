import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Permission } from 'src/app/enums/permission.enum';

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
  
  constructor() {
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

  public isValid(formControl: string): boolean {
		return this.createUserForm.controls[formControl]?.valid;
	}

  public disableSubmit(): boolean {
    return !this.createUserForm.valid;
  }

  public createUser(): void {
    this.loading = true;
    console.log('create user');
    this.loading = false;
  }

}

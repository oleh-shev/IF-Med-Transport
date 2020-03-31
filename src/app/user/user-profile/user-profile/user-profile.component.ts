import { Component, OnInit, ViewChild } from '@angular/core';
import { defaultImage } from 'src/app/shared/default-image/default-image';
import { User } from 'src/app/shared/entity.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService, private apiService: ApiService, private snackBar: MatSnackBar) { }
  profileForm = new FormGroup({
    first_name: new FormControl('',
    [
      Validators.required,
    ]),
    last_name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
  });

  img: string = defaultImage;
  isUpdate = false;

  ngOnInit() {
    this.authService.currentUser
    .subscribe((data: User) => this.user = data);
   }

  concatName(...items: Array<string>) {
    return items.join(' ');
  }
  onUpdate() {
    this.isUpdate = true;
    this.profileForm.patchValue(this.user);
  }
  onSubmit() {
    this.apiService.updateUser(this.profileForm.value, this.user.id)
    .subscribe(data => {
      this.openSnackBar('Дані оновлено');
      this.authService.currentUser.next(data);
      this.isUpdate = false;
    },
    err => {
      this.openSnackBar(err);
      this.isUpdate = false;
    });
  }
  cancelUpdate() {
    this.profileForm.reset();
    this.isUpdate = false;
  }

  get first_name() {
    return this.profileForm.get('first_name') as FormControl;
  }
  get last_name() {
    return this.profileForm.get('last_name') as FormControl;
  }
  get email() {
    return this.profileForm.get('email') as FormControl;
  }
  get description() {
    return this.profileForm.get('description') as FormControl;
  }
  getErrorMessage(field: FormControl) {
    return field.hasError('required') ? 'Це поле є обовязкове*' :
      field.hasError('pattern') ? 'Поле містить недопустимі символи або (Цифри, латинські букви)' :
        '';
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}

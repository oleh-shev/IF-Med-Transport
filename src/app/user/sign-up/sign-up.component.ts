import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../shared/services/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  userData: FormGroup;
  constructor(
    private fb: FormBuilder,
    ) {
    this.userData = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.email]],
      description: ['', Validators.maxLength(256)],
      phone_number: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^[ 0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9_]*$')]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }
  ngOnInit() {
  }

  registerUser() {
    const data = this.userData.value;
    delete data.confirm_password;
    data.phone_number = `+380${data.phone_number}`;
    console.log(data);
  }

}

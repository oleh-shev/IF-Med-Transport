import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      email: ['', Validators.email],
      description: ['', Validators.maxLength(54)],
      phone_number: ['', Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      password: ['', Validators.required, Validators.minLength(8)],
      confirm_password: ['', Validators.required]
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

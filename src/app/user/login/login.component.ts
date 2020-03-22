import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: FormGroup;
  constructor(
    fb: FormBuilder,
  ) {
    this.userData = fb.group({
      phone_number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  loginUser() {
    const data = this.userData.value;
    data.phone_number = `+380${data.phone_number}`;
    console.log(data);
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {error} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: FormGroup;
  listOfErrors: any = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
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
    this.authService.logIn(data).subscribe(() => {
      this.route.navigate(['home']);
    }, (err: any) => {
      if (err.error.detail.includes('No active account found with the given credentials')) {
        this.listOfErrors = 'Не знайдено акаунт з такими даними';
        this.userData.reset();
      }
    });
  }


}

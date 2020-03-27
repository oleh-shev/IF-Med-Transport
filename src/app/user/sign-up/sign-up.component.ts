import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../shared/services/password-validator';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../shared/entity.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  userData: FormGroup;
  passwordFocus: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
  ) {
    this.userData = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.email]],
      description: ['', Validators.maxLength(200)],
      phone_number: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^[ 0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern('(?!^\\d+$)^.+$')]],
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
    this.authService.signUp(data).subscribe(response => {
      this.route.navigate(['']);
    }, err => {
      const errors: User = err.error;
      Object.keys(errors).forEach(prop => {
        const formControl = this.userData.get(prop);
        if (formControl) {
          formControl.setErrors({
            serverError: errors[prop]
          });
        }
      });
    });
  }

}

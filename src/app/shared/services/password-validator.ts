import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    if (AC.get('confirm_password').touched || AC.get('confirm_password').dirty) {
      const verifyPassword = AC.get('confirm_password').value;

      if (password !== verifyPassword) {
        AC.get('confirm_password').setErrors({MatchPassword: true});
      } else {
        return null;
      }
    }
  }
}

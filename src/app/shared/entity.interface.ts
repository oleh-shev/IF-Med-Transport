import {Validators} from '@angular/forms';

export interface Tokens {
  access: string;
  refresh: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  description: string;
  phone_number: string;
  password: string;
}

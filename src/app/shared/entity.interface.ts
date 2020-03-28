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

export interface Trip {
  date: string;
  time: string;
  departure: string;
  from_location_1: number;
  from_location_2: number;
  to_location_1: number;
  to_location_2: number;
  from_text_description: string;
  to_text_description: string;
  car_description: string;
  available_places: number;
  driver_comments: string;
}

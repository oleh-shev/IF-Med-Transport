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
  id?: string;
  created_at?: string;
  state: string;
  detarture_time: string;
  driver: User;
  car_description: string;
  driver_comments: string;
  available_places: number;
  current_available_places: number;
  current_user_has_reservation: boolean;
  from_location_1: SubLocation;
  from_location_2: SubLocation;
  from_text_description: string;
  to_location_1: SubLocation;
  to_location_2: SubLocation;
  to_text_description: string;
  reserve_places_url?: string;
  cancel_url?: string;
  complete_url?: string;
}

export interface SubLocation {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
  sublocations: SubLocation[];
}

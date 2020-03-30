import {Validators} from '@angular/forms';

export interface Tokens {
  access: string;
  refresh: string;
}

export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  description: string;
  phone_number: string;
  password?: string;
  photo?: string;
}

export interface FutureTrip {
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entity.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // in case of interseptior missing add url into apiURI
  apiURI = '';

  constructor(private http: HttpClient) { }

  getFutureActiveTrips(): Observable<any> {
    return this.http.get(`${this.apiURI}future_active_trips`);
  }

  getInfoAboutMe(): Observable<any> {
    return this.http.get(`${this.apiURI}auth/users/me/`);
  }

  updateUser(obj: User, id: any): Observable<any> {
    return this.http.put(`${this.apiURI}auth/users/${id}/`, obj);
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiURI}locations/`);
  }

  getUserReservations(): Observable<any> {
    return this.http.get(`${this.apiURI}trips/user_reservations/`);
  }

  createReservePlaces(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/${id}/reserve_places/`, payload)
  }

  cancelTripByPassenger(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/reservations/${id}/cancel_by_passenger/`, payload);
  }

  getUserTrips(): Observable<any> {
    return this.http.get(`${this.apiURI}trips/user_trips/`);
  }

  getTripById(id: string): Observable<any> {
    return this.http.get(`${this.apiURI}trips/${id}/`);
  }
  acceptTrip(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/reservations/${id}/accept/`, payload);
  }
  
  rejectTrip(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/reservations/${id}/reject/`, payload);
  }
  
  cancelTripByDriver(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/reservations/${id}/cancel_by_driver/`, payload);
  }

  cancelTrip(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/${id}/cancel/`, payload);
  }

  completeTrip(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/${id}/complete/`, payload);
  }

}

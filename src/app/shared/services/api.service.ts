import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiURI}locations/`);
  }

  getUserReservations(): Observable<any> {
    return this.http.get(`${this.apiURI}trips/user_reservations/`);
  }

  createReservePlaces(id: string, payload): Observable<any> {
    return this.http.post(`${this.apiURI}trips/${id}/reserve_places/`, payload)
  }

}

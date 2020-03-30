import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, tap} from 'rxjs/operators';
import {Tokens, User} from '../entity.interface';
import * as jwt_decode from 'jwt-decode';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = new EventEmitter();
  private userId: string;
  public currentUser = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) {
  }

  signUp(newUserData) {
    return this.http.post('auth/users/', newUserData).pipe(
      switchMap(() => {
        const loginData = {
          phone_number: newUserData.phone_number,
          password: newUserData.password
        };
        return this.logIn(loginData);
      })
    );
  }

  logIn(userData) {
    return this.http.post('auth/jwt/create/', userData).pipe(
      map((response: Tokens) => {
        this.accessToken = response.access;
        this.refreshToken = response.refresh;
        this.isLogged.emit(true);
      })
    );
  }

  isUserLogged() {
    return this.isLogged;
  }

  getUserId() {
    this.userId = jwt_decode(this.accessToken).user_id;
    return this.userId;
  }

  getUserInfo() {
    return this.http.get(`auth/users/${this.getUserId()}/`);
  }

  logOut() {
    return this.http.post('auth/jwt/blacklist/', {
      refresh: this.refreshToken
    }).pipe(
      tap(response => {
        this.isLogged.emit(false);
        this.removeTokens();
      })
    );
  }


  get accessToken(): string {
    return localStorage.getItem('access');
  }

  set accessToken(token) {
    localStorage.setItem('access', token);
  }

  get refreshToken() {
    return localStorage.getItem('refresh');
  }

  set refreshToken(token) {
    localStorage.setItem('refresh', token);
  }

  removeTokens() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  getNewAccessToken() {
    return this.http.post('auth/jwt/refresh/', {
      refresh: this.refreshToken
    }).pipe(
      tap((token: Tokens) => {
        return this.accessToken = token.access;
      })
    );
  }


}

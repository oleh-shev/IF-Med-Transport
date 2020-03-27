import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../environments/environment';
import {AuthService} from './shared/services/auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {error} from 'util';
import {Tokens} from './shared/entity.interface';
import {MatSnackBar} from '@angular/material';

@Injectable()

export class ApiHttpInterceptor implements HttpInterceptor {
  private environmentUrl = environment.apiUrl;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = request.clone({url: `${this.environmentUrl + request.url}`});

    if (this.authService.accessToken) {
      apiReq = this.addToken(apiReq, this.authService.accessToken);
    }

    return next.handle(apiReq).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(apiReq, next);
        } else if (err instanceof HttpErrorResponse && err.status === 400) {
          this.openSnackBar();
          this.isRefreshing = false;
        } else {
          throw error(err);
        }
      })
    );

  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `JWT ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log(this.isRefreshing);
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.getNewAccessToken().pipe(
        switchMap((token: Tokens) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);
          return next.handle(this.addToken(request, token.access));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }

  openSnackBar() {
    this.snackBar.open('Ця дія доступна тільки для авторизованих користувачів', 'X', {
      duration: 6000,
    });
  }
}

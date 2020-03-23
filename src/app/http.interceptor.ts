import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()

export class ApiHttpInterceptor implements HttpInterceptor {
  private environmentUrl = environment.apiUrl;
  constructor(
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = request.clone({url: `${this.environmentUrl + request.url}`});
    return next.handle(apiReq);

  }
}

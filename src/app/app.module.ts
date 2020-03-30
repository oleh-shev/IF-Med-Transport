import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserModule} from './user/user.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiHttpInterceptor} from './http.interceptor';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material-module/material.module';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { AddTripComponent } from './add-trip/add-trip.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'add-trip', component: AddTripComponent
  }
];

@NgModule({
  declarations: [UserComponent, LoginComponent, SignUpComponent, HomeComponent, ToolbarComponent, UserProfileComponent, AddTripComponent],
  exports: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: []
})
export class UserModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PassBoardComponent } from './pass-board/pass-board.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { PassBoardReserveComponent } from './pass-board/pass-board-reserve/pass-board-reserve.component';
import { TripStatePipe } from '../shared/pipes/trip-state.pipe';
import { DriverBoardComponent } from './driver-board/driver-board.component';
import { ReservationStatePipe } from '../shared/pipes/reservation-state.pipe';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { MaterialModule } from '../shared/material-module/material.module';
import { DriverBoardConfirmComponent } from './driver-board/driver-board-confirm/driver-board-confirm.component';
import { AuthGuard } from '../guard/auth.guard';
import { NotFoundComponent } from '../shared/error-page/not-found/not-found.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'add-trip', component: AddTripComponent
  },
  {
    path: 'pass-board', component: PassBoardComponent
  },
  {
    path: 'driver-board', component: DriverBoardComponent, canActivate: [AuthGuard]
  },
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ToolbarComponent,
    PassBoardComponent,
    UserProfileComponent,
    AddTripComponent,
    PassBoardReserveComponent,
    TripStatePipe,
    DriverBoardComponent,
    ReservationStatePipe,
    DriverBoardConfirmComponent,
    NotFoundComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [

  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
  entryComponents: [
    PassBoardReserveComponent,
    DriverBoardConfirmComponent,
  ]
})
export class UserModule {
}

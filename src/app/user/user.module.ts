import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatToolbarModule, MatOptionModule,
  MatSelectModule, MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PassBoardComponent } from './pass-board/pass-board.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { PassBoardReserveComponent } from './pass-board/pass-board-reserve/pass-board-reserve.component';
import { PassBoardService } from './pass-board/pass-board.service';
import { TripStatePipe } from '../shared/pipes/trip-state.pipe';
import { DriverBoardComponent } from './driver-board/driver-board.component';
import { ReservationStatePipe } from '../shared/pipes/reservation-state.pipe';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'add-trip', component: AddTripComponent
  },
  {
    path: 'pass-board', component: PassBoardComponent
  },
  {
    path: 'driver-board', component: DriverBoardComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ToolbarComponent,
    PassBoardComponent,
    AddTripComponent,
    PassBoardReserveComponent,
    TripStatePipe,
    DriverBoardComponent,
    ReservationStatePipe,
  ],
  exports: [
    UserComponent
  ],
  providers: [
    PassBoardService,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  entryComponents: [
    PassBoardReserveComponent,
  ]
})
export class UserModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {
    MatButtonModule, MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
} from '@angular/material';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PassBoardComponent } from './pass-board/pass-board.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ToolbarComponent,
    PassBoardComponent],
  exports: [
    UserComponent
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
    ]
})
export class UserModule {
}

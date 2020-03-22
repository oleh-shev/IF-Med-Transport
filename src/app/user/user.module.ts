import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MatButtonModule, MatListModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PassBoardComponent } from './pass-board/pass-board.component';

const routes: Routes = [
  /*{
    path: '', component: UserComponent,
    children: [
      /!*{
        path: '', redirectTo: 'home', pathMatch: 'full'
      },*!/
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'sign-up', component: SignUpComponent
      }
    ]
  },*/
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
  declarations: [UserComponent, LoginComponent, SignUpComponent, HomeComponent, ToolbarComponent, PassBoardComponent],
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
  ]
})
export class UserModule {
}

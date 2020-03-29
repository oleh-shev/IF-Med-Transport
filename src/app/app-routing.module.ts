import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassBoardComponent } from './user/pass-board/pass-board.component';


const routes: Routes = [
  { path: 'pass-board', component: PassBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

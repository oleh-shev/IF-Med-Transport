import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/entity.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  subscription: any;
  isLogged: boolean;

  constructor(
    public authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.isLogged = this.authService.isTokenAvailable();
    this.subscription = this.authService.isUserLogged()
    .pipe(
      switchMap(data => {
        this.isLogged = data;
        return this.authService.getUserInfo();
      })
    )
    .subscribe((data: User) => {
      this.authService.currentUser.next(data);
    });
  }
  logOut() {
    this.authService.logOut().subscribe();
  }

}

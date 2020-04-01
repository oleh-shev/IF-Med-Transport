import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/entity.interface';
import { Router } from '@angular/router';

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
    private route: Router
  ) {
  }

  ngOnInit() {
    this.isLogged = this.authService.isTokenAvailable();
    this.subscription = this.authService.isUserLogged().subscribe(data => {
      this.isLogged = data;
    });
    if (this.authService.isTokenAvailable()) {
      this.authService.getUserInfo()
      .subscribe((data: User) => {
        console.log('How many times(toolbar)');
        this.authService.currentUser.next(data);
      });
    }
  }
  logOut() {
    this.authService.logOut().subscribe();
    this.route.navigate(['']);
    this.authService.currentUser.next(null);
  }

}

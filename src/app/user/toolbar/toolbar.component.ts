import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  subscription: any;
  isLogged: boolean;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.authService.isUserLogged().subscribe(data => {
      this.isLogged = data;
    });
  }

  logOut() {
    this.authService.logOut().subscribe();
  }

}

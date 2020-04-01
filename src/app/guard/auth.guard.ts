import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
        ) {}
    canActivate(): boolean {
        if (this.authService.isTokenAvailable()) {
           return true;
        } else {
            this.router.navigate(['login']);
            this.openSnackBar('Зареєструйтеся, будь ласка, або увійдіть в особистий профіль');
            return false;
        }
    }
    openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action, {
          duration: 2500,
        });
      }
}

/*  import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
  } from '@angular/router';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { AuthService } from './auth.service';
  @Injectable()
  export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated()
        .then(
          (authenticated: boolean) => {
            if (authenticated) {
              return true;
            } else {
              this.router.navigate(['/login']);
            }
          }
        );
    }
    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
    }
  }
 */
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.verifyLogin(url);
    }
    verifyLogin(url) {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }         else if (this.isLoggedIn()) {
            return true;
        }
    }
    isLoggedIn() {
        let status = false;
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
          status = true;
        }         else {
          status = false;
        }
        return status;
    }
}

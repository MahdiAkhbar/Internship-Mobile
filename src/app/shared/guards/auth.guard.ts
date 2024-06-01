import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserAgentService } from '../services/user-agent.service';
import { UserService } from '../services/user.service';
import { catchError, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  isLoggedIn: boolean = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    if (!this.isLoggedIn) {
      this.isLoggedIn = true;
      let user = this.userService.getUser();
      return new Promise(resolve => {
        this.userService.getUserProfile(user.username)
          .pipe(
            take(1),
            catchError((err) => {
              resolve(false);
              return throwError(() => err)
            })
          )
          .subscribe(() => {
            resolve(true);
          })
      })
    }
    // the block below is useful if we want to use guard for inner routes
    else {
      let status = this.authService.getLoggedInState();
      if (status) {
        return true;
      }
      else {
        if (!route.routeConfig?.path?.includes('signup')) {
          this.router.navigate(['/d/login']);
        }
        return false;
      }
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};

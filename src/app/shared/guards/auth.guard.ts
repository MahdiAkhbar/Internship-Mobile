import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserAgentService } from '../services/user-agent.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userAgentService: UserAgentService
  ) { }

  loggedIn: boolean = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    let status = this.authService.getLoggedInState();
    if (status) {
      console.log('true in guard');
      return true;
    }
    else {
      console.log('false in guard');

      if (!route.routeConfig?.path?.includes('signup'))
        this.router.navigate(['/m/login']);
      return false;
    }
  }

}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};

import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CommonRestService} from './common-rest.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: CommonRestService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called');
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.setRedirectUrl(routeState.url);

    // navigate to login page:
    this.router.navigate(['/user']);

    return false;
  }
}

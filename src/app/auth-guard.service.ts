import {Log} from 'ng2-logger/ng2-logger'
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CommonRestService} from './common-rest.service';


/**
 * To restrict unauthenticated users to the unauthenticated area they will be redirected to the login page.
 */
@Injectable()
export class AuthGuardService implements CanActivate {
  private log = Log.create('auth-guard');

  constructor(private commonRestService: CommonRestService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot) {
    this.log.i('AuthGuard#canActivate called');
    if (this.commonRestService.isLoggedIn()) {
      return true;
    }

    this.commonRestService.setRedirectUrl(routeState.url);

    // navigate to login page:
    this.router.navigate(['/user']);

    return false;
  }
}

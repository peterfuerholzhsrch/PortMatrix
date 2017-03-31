import {Log} from 'ng2-logger/ng2-logger'
import {Component, OnInit, ViewEncapsulation, OnDestroy, DoCheck} from '@angular/core';
import {UserManagementService} from '../user-management.service';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {Subscription} from 'rxjs';


/**
 * The main component is responsible for the main menu and an error message at this level.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy, DoCheck {
  private log = Log.create('main-component');

  private errormessage: String = '';
  private lastErrormessage: number;
  private multiEmailFormValid: boolean;

  private inviteColleaguesSubscription: Subscription;


  /**
   * @param userManagementService injected service
   * @param router injected router
   */
  constructor(
    private userManagementService: UserManagementService,
    private router: Router) {
  }


  /**
   * NG2 lifecycle hook
   */
  ngOnInit() {
    this.errormessage = null;
  }


  /**
   * NG2 lifecycle hook.
   * ngOnChanges() cannot be used here since method is called too infrequently.
   * @returns {any}
   */
  ngDoCheck() {
    // clear errormessage after first rendering:
    if (this.errormessage) {
      if (!this.lastErrormessage) {
        // save time of new error message:
        this.lastErrormessage = new Date().getTime();
      }
      else if (new Date().getTime() - this.lastErrormessage > 2000) {
        // error message appeared for at least 2 seconds:
        this.errormessage = null;
        this.lastErrormessage = null;
      }
    }
  }


  /**
   * lifecycle hook
   */
  ngOnDestroy() {
    if (this.inviteColleaguesSubscription) {
      this.inviteColleaguesSubscription.unsubscribe();
    }
  }


  setInviteColleaguesFormValid(valid: boolean) {
    this.log.i('setInviteColleaguesFormValid ' + valid);
    this.multiEmailFormValid = valid;
  }


  getUserIdString(): String {
    const user: User = this.userManagementService.getUser();
    return user ? 'User: ' + user.email : '';
  }


  /**
   * @returns {any} 'Admin' if user is admin (creator) of current project, 'User' if associated to current project or
   * '' is not logged in.
   */
  getRoleString(): String {
    const projectAdmin: Boolean = this.userManagementService.isProjectAdmin();
    if (this.isLoggedIn() && projectAdmin) {
      return 'Role: ' + (projectAdmin.valueOf() ? 'Admin' : 'User');
    }
    return '';
  }


  /**
   * @returns {boolean} true if logged in
   */
  isLoggedIn(): boolean {
    return this.userManagementService.isLoggedIn();
  }


  /**
   * @returns {Boolean} true if user is project admin (creator)
   */
  isProjectAdmin(): Boolean {
    return this.userManagementService.isProjectAdmin();
  }


  /**
   * Logs out current user and navigates to main page (unauthenticated area)
   */
  logout(): void {
    this.userManagementService.logout().then(() => {
        this.userManagementService.setUser(null);
        this.userManagementService.setProjectId(null);
        return this.router.navigate(['/'])
      },
      this.handleError);
  }


  /**
   * Deletes the current user (including his project and contained network switchings)
   */
  deleteUser(): void {
    this.userManagementService.removeUser(this.userManagementService.getUser().getId())
      .then(() => {
          this.userManagementService.setUser(undefined);
          this.logout()
        },
        this.handleError);
  }


  /**
   * Sends an email invitation to each email address contained in emailAddresses.
   * @param emailAddresses
   */
  inviteColleagues(emailAddresses: Array<string>) {
    this.log.i('inviteColleagues: ', emailAddresses);
    this.inviteColleaguesSubscription = this.userManagementService.inviteColleagues(emailAddresses)
      .subscribe(() => {}, err => this.handleError(err));
  }


  /**
   * Navigates to the network switching browser component.
   */
  gotoNwswBrowsing() {
    if (this.userManagementService.getProjectId()) {
      this.router.navigate(['/nwsw', this.userManagementService.getProjectId()]);
    }
  }


  /**
   * handleError is a closure so it is already bound to this!
   * @param err
   */
  private handleError = (err) => {
    this.log.er('Error=' + err);
    this.errormessage = (err.text && err.text()) || err.statusText || err;
  }
}

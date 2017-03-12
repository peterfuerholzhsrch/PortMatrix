import {Log} from 'ng2-logger/ng2-logger'
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserManagementService} from "../user-management.service";
import {Router} from "@angular/router";
import {User} from '../model/user';

@Component({
  selector: 'app-root',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  private log = Log.create('main-component');

  private errormessage: String = '';
  private errormessageShown = false;
  private multiEmailFormValid: boolean;


  constructor(
    private userManagementService: UserManagementService,
    private router: Router) {
  }


  ngOnInit() {
    this.errormessage = null;
  }

  ngDoCheck() {
    // clear errormessage after first rendering:
    if (this.errormessage) {
      if (this.errormessageShown) {
        this.errormessage = null;
      }
      this.errormessageShown = !this.errormessageShown;
    }
  }

  setInviteColleaguesFormValid(valid: boolean) {
    this.log.i("setInviteColleaguesFormValid " + valid);
    this.multiEmailFormValid = valid;
  }


  getUserIdString(): String {
    const user: User = this.userManagementService.getUser();
    return user ? 'User: ' + user.email : '';
  }


  getRoleString(): String {
    const projectAdmin: Boolean = this.userManagementService.isProjectAdmin();
    if (this.isLoggedIn() && projectAdmin) {
      return 'Role: ' + (projectAdmin.valueOf() ? 'Admin' : 'User');
    }
    return '';
  }


  isLoggedIn(): boolean {
    return this.userManagementService.isLoggedIn();
  }


  isProjectAdmin(): Boolean {
    return this.userManagementService.isProjectAdmin();
  }


  logout(): void {
    this.userManagementService.logout().then(() => {
        this.userManagementService.setUser(undefined);
        return this.router.navigate(['/'])
      },
      this.handleError);
  }


  deleteUser(): void {
    this.userManagementService.removeUser(this.userManagementService.getUser().getId())
      .then(() => {
          this.userManagementService.setUser(undefined);
          this.logout()
        },
        this.handleError);
  }


  inviteColleagues(emailAddresses: Array<string>) {
    this.log.i("inviteColleagues: ", emailAddresses);
    this.userManagementService.inviteColleagues(emailAddresses).subscribe(ok =>{}, err => this.handleError(err));
  }


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
    this.log.er("Error=" + err);
    this.errormessage = (err.text && err.text()) || err.statusText || err;
  }
}

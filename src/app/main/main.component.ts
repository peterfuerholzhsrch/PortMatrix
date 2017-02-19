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

  private errormessage: String = '';
  private multiEmailFormValid: boolean;


  constructor(
    private userManagementService: UserManagementService,
    private router: Router) {
  }


  ngOnInit() {
    this.errormessage = null;
  }


  setInviteColleaguesFormValid(valid: boolean) {
    console.log("setInviteColleaguesFormValid " + valid);
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
    // TODO
    console.log("main.component.inviteColleagues: " + emailAddresses);
    this.userManagementService.inviteColleagues(emailAddresses)
  }

  /**
   * handleError is a closure so it is already bound to this!
   * @param err
   */
  private handleError = (err) => {
    console.log("Error=" + err); // TODO delete
    this.errormessage = err.text() ? err.text() : err.statusText;
  }
}

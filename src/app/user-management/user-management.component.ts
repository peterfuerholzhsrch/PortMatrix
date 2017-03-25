import {Log} from 'ng2-logger/ng2-logger'
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {User} from "../model/user";
import {Project} from "../model/project";
import {UserManagementService} from "../user-management.service";
import {ProjectService} from "../project.service";
import {CommonRestService} from "../common-rest.service";


/**
 * Component for:
 * - register new user
 * - login
 */
@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  exportAs: 'ngModel'
})
export class UserManagementComponent implements OnInit {
  private static log = Log.create('user-management');

  private user: User; // used for form only
  private assignedProjectId: string;

  private static errormessage: string;


  constructor(
    private userManagementService: UserManagementService,
    private authService: CommonRestService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private setUser(user: User) {
    this.user = user;
    this.userManagementService.setUser(user);
  }

  private updateUserInternal(user: User) {
    this.user.updateUser(user); // save _id
    this.userManagementService.setUser(this.user);
  }

  getErrormessage(): string {
    return UserManagementComponent.errormessage;
  }


  ngOnInit() {
    // from https://angular.io/docs/ts/latest/guide/router.html#!#query-parameters:
    this.route.queryParams
      .switchMap((params: Params) => {
          this.assignedProjectId = params['assignedProject'];
          return this.assignedProjectId || "assignedProjectId_not_set";  // don't return null / undefined!
        })
      .subscribe();

    this.initUser();
  }


  initUser(): void {
    this.user = new User();
    UserManagementComponent.errormessage = null;
  }


  isLoggedIn(): boolean {
    return this.userManagementService.isLoggedIn();
  }


  registerUser(): void {
    if (this.assignedProjectId) {
      this.userManagementService.addUserToProject(this.user.email, this.user.password, this.assignedProjectId)
        .then((userAndProject) => {
          UserManagementComponent.errormessage = null;
          this.updateUserInternal(userAndProject.user); // save _id
          this.openProject(userAndProject.project)
        }, UserManagementComponent.handleError);
    }
    else {
      this.userManagementService.addUser(this.user.email, this.user.password)
        .then((userAndProject) => {
          this.updateUserInternal(userAndProject.user); // save _id
          this.openProject(userAndProject.project)
        }, UserManagementComponent.handleError);
    }
  }


  login(): void {
    this.userManagementService.validateUser(this.user.email, this.user.password)
      .then((jsonUser) => {
          UserManagementComponent.log.i("Login OK=" + jsonUser);
          UserManagementComponent.errormessage = null;
          this.updateUserInternal(jsonUser); // save _id
        })
      .then(() => {
          return this.projectService.getProjectsByUserId(this.user.getId(), true/*assignedToo*/);
        })
      .then((projects) => {
        let redirectUrl = this.authService.getRedirectUrl();
        if (redirectUrl) {
          // check if saved redirection is still valid (e.g. project got deleted and thus is no longer valid):
          const found = projects.find(project => redirectUrl.indexOf(project.getId()) >= 0);
          if (found) {
            this.router.navigate([this.authService.getRedirectUrl()]);
            this.authService.setRedirectUrl(undefined);
            return;
          }
        }
        this.openProjects(projects);
      })
      .catch(UserManagementComponent.handleError);
  }


  updateUser(): void {
    this.userManagementService.updateUser(this.user)
      .then((user) => {
          this.setUser(undefined);
        },
        UserManagementComponent.handleError);
  }


  private openProject(project: Project): void {
    UserManagementComponent.log.i("openProject project=", JSON.stringify(project));
    if (project) {
      this.userManagementService.setProject(project);
      this.router.navigate(['/nwsw', project.getId()]);
    }
  }


  private openProjects(projects: Array<Project>): void {
    UserManagementComponent.log.i("openProjects projects=", projects);
    // TODO It is possible that a user belongs to more than one project. Currently we support only one!
    this.openProject(projects.length ? projects[0] : null);
  }


  /**
   * handleError is a closure so it is already bound to this!
   * @param err
   */
  private static handleError(err) {
    UserManagementComponent.log.er("Error=", err);
    UserManagementComponent.errormessage = err.text() ? err.text() : err.statusText;
  }
}

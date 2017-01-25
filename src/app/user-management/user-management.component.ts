import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/user";
import {Project} from "../model/project";
import {UserManagementService} from "../user-management.service";
import {ProjectService} from "../project.service";

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  exportAs: 'ngModel'
})
export class UserManagementComponent implements OnInit {
  private user: User;
  private assignedProjectId: string;

  private errormessage: string;


  constructor(
    private userManagementService: UserManagementService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.assignedProjectId = this.route.params['assignedProject'];
    this.initUser();
  }


  initUser(): void {
    this.user = new User();
    this.errormessage = null;
  }


  isLoggedIn(): boolean {
    return this.userManagementService.isLoggedIn();
  }

  registerUser(): void {
    if (this.assignedProjectId) {
      this.userManagementService.addUserToProject(this.user.email, this.user.password, this.assignedProjectId)
        .then((userAndProject) => {
          this.user.updateUser(userAndProject.user); // save _id
          this.openProject(userAndProject.project)
        }, this.handleError);
    }
    else {
      this.userManagementService.addUser(this.user.email, this.user.password)
        .then((userAndProject) => this.openProject(userAndProject.project), this.handleError);
    }
  }


  login(): void {
    this.userManagementService.validateUser(this.user.email, this.user.password)
      .then((jsonUser) => {
          console.log("Login OK=" + jsonUser);
          this.errormessage = null;
          this.user.updateUser(jsonUser); // save _id
        })
      .then(() => {
          return this.projectService.getProjectsByUserId(this.user.getId(), true/*assignedToo*/);
        })
      .then((projects) => this.openProjects(projects))
      .catch(this.handleError);
  }


  deleteUser(): void {
    this.userManagementService.removeUser(this.user.getId())
      .then(() => this.logout(),
        this.handleError);
  }


  updateUser(): void {
    this.userManagementService.updateUser(this.user)
      .then((user) => {
        this.user = user;
      }, this.handleError);
  }


  logout(): void {
    this.userManagementService.logout().then(() => this.router.navigate(['/']), this.handleError);
  }


  private openProject(project: Project): void {
    console.log("openProject project=" + project);
    if (project) {
      this.router.navigate(['/nwsw', project.getId()]);
    }
  }


  private openProjects(projects: Array<Project>): void {
    console.log("openProjects projects=" + projects);
    // TODO It is possible that a user belongs to more than one project. Currently we support only one!
    this.openProject(projects.length ? projects[0] : null);
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

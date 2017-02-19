import {Http} from '@angular/http';

import {Injectable, AfterViewInit} from '@angular/core';
import {UserAndProject} from './model/userAndProject';
import {User} from './model/user';
import {Project} from "./model/project";
import {CommonRestService} from "./common-rest.service";
import {SessionStorageService} from "./session-storage.service";
import {ProjectService} from "./project.service";


@Injectable()
export class UserManagementService extends CommonRestService {

  private static USERS_URL = '/api/users';
  private static USERSMAIL_URL = '/api/usersmail';

  private project: Project;
  private projectId: string; // used to bridge the gap where project is not yet loaded
  private user: User;


  constructor(private sessionStorageService: SessionStorageService,
              private projectService: ProjectService,
              http: Http) {
    super(http);
  }

  public addUser(email: string, password: string): Promise<UserAndProject> {
    return this.addUserToProject(email, password, null);
  }


  addUserToProject(email: string, password: string, projectId: string): Promise<UserAndProject> {
    const params = { email: email, password: password };
    if (projectId) {
      params['referencedProject'] = projectId;
    }

    return this.post(UserManagementService.USERS_URL, params)
      .toPromise()
      .then(response => {
        const jsonBody = response.json();
        this.setJwtToken(jsonBody);
        return UserAndProject.jsonToObj(jsonBody);
      })
      .catch(UserManagementService.handleError);
  }


  public removeUser(userId: string): Promise<void> {
    return this.delete(`${UserManagementService.USERS_URL}/${userId}`)
      .toPromise()
      .then(() => null)
      .catch(UserManagementService.handleError);
  }


  public updateUser(user: User): Promise<User> {
    const url = `${UserManagementService.USERS_URL}/${user.getId()}`;
    return this.put(url, user)
      .toPromise()
      .then(response => {
        return User.jsonToObj(response.json());
      })
      .catch(UserManagementService.handleError);
  }


  /**
   * When redirecting we just know the URL and with this the projectId -> load project if needed
   * @param projectId
   */
  public setProjectId(projectId: string) {
    this.projectId = projectId;
    if (!this.project || this.project.getId() != projectId) {
      // project is not loaded or changed -> reload it:
      this.projectService.getProject(projectId)
        .then(project => this.project = project)
        .catch(UserManagementService.handleError);
    }
  }

  public getProjectId(): string {
    return this.projectId;
  }

  public setUser(user: User) {
    this.user = user;
// TODO if saved persistently then JWT token must be saved as well:
//    this.sessionStorageService.setUser(user);
  }

  public getUser(): User {
    return this.user;
// TODO if saved persistently then JWT token must be saved as well:
//   return this.sessionStorageService.getUser();
  }

  public setProject(project: Project) {
    this.project = project;
    this.projectId = this.project ? this.project.getId() : null;
  }

  public getProject(): Project {
    return this.project;
  }

  /**
   * @returns {Boolean} true if user logged in and the user is set project's admin (= (normally) its creator); null
   * if information is missing
   */
  public isProjectAdmin(): Boolean {
    const user = this.getUser();
    if (!this.project || !user) {
      return null;
    }
    return this.project.adminId == user.getId()
  }


  /**
   * This method shall only be called when the user is set the user is the admin of the current project!
   * @param recipients
   * @returns {any}
   */
  public inviteColleagues(recipients: Array<string>): Promise<boolean> {
    if (!this.project) {
      UserManagementService.handleError("no project set!");
      return;
    }
    const params = { recipients: recipients, projectId: this.projectId, adminId: this.user.getId() };

    return this.post(UserManagementService.USERSMAIL_URL, params)
      .toPromise()
      .then(response => {
        // OK
      })
      .catch(UserManagementService.handleError);
  }
}

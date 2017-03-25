import {Http} from '@angular/http';

import {Injectable, AfterViewInit} from '@angular/core';
import {UserAndProject} from './model/userAndProject';
import {User} from './model/user';
import {Project} from "./model/project";
import {CommonRestService} from "./common-rest.service";
import {SessionStorageService} from "./session-storage.service";
import {ProjectService} from "./project.service";
import {Observable} from "rxjs";



@Injectable()
export class UserManagementService extends CommonRestService {

  private static USERS_URL = '/api/users';
  private static USERSMAIL_URL = '/api/usersmail';

  private project: Project;


  constructor(http: Http,
              private projectService: ProjectService,
              sessionStorageService: SessionStorageService) {
    super(http, sessionStorageService);
  }

  addUser(email: string, password: string): Promise<UserAndProject> {
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
      .catch(CommonRestService.handleError);
  }


  removeUser(userId: string): Promise<void> {
    return this.delete(`${UserManagementService.USERS_URL}/${userId}`)
      .toPromise()
      .then(() => null)
      .catch(CommonRestService.handleError);
  }


  updateUser(user: User): Promise<User> {
    const url = `${UserManagementService.USERS_URL}/${user.getId()}`;
    return this.put(url, user)
      .toPromise()
      .then(response => {
        return User.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }


  /**
   * When redirecting we just know the URL and with this the projectId -> load project if needed
   * @param projectId
   */
  setProjectId(projectId: string) : Promise<Project> {
    this.sessionStorageService.setProjectId(projectId);

    if (projectId) {
      if (!this.project || this.project.getId() != projectId) {
        // project is not loaded or changed -> reload it:
        return this.projectService.getProject(projectId)
          .then(project => this.project = project, err => Promise.reject(err));
      }
    }
    else {
      this.project = null;
    }
    return Promise.resolve(this.project);
  }

  getProjectId(): string {
    return this.sessionStorageService.getProjectId();
  }

  setUser(user: User) {
    this.sessionStorageService.setUser(user);
  }

  getUser(): User {
   return this.sessionStorageService.getUser();
  }

  setProject(project: Project) {
    this.project = project;
    this.sessionStorageService.setProjectId(this.project ? this.project.getId() : null);
  }

  getProject(): Project {
    return this.project;
  }

  /**
   * @returns {Boolean} true if user logged in and the user is set project's admin (= (normally) its creator); null
   * if information is missing
   */
  isProjectAdmin(): Boolean {
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
  inviteColleagues(recipients: Array<string>): Observable<any> {
    if (!this.project) {
      CommonRestService.handleError("no project set!");
      return Observable.throw("no project set!");
    }
    const params = {
      recipients: recipients,
      projectId: this.sessionStorageService.getProjectId(),
      adminId: this.sessionStorageService.getUser().getId()
    };

    let observable = this.post(UserManagementService.USERSMAIL_URL, params)
      .do(ok => { CommonRestService.log.i("emails to=", recipients, " OK!") },
          err => CommonRestService.handleError(err));
    return observable;
  }
}

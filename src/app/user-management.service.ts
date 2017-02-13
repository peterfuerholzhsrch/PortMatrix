import {Http} from '@angular/http';

import {Injectable, AfterViewInit} from '@angular/core';
import {UserAndProject} from './model/userAndProject';
import {User} from './model/user';
import {Project} from "./model/project";
import {CommonRestService} from "./common-rest.service";
import {SessionStorageService} from "./session-storage.service";


@Injectable()
export class UserManagementService extends CommonRestService {

  private static USERS_URL = '/api/users';

  private project: Project;
  private user: User;


  constructor(private sessionStorageService: SessionStorageService,
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

    // let uri = `email=${encodeURI(email)}&password=${encodeURI(password)}`;
    // if (projectId) {
    //   uri += `referencedProject=${encodeURI(projectId)}`;
    // }

    return this.post(UserManagementService.USERS_URL, params)
      .toPromise()
      .then(response => {
        return UserAndProject.jsonToObj(response.json());
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

  public inviteColleagues() {
    // TODO send emails!!!
  }
}

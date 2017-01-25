import {Http} from '@angular/http';

import {Injectable} from '@angular/core';
import {UserAndProject} from './model/userAndProject';
import {User} from './model/user';
import {CommonRestService} from "./common-rest.service";


@Injectable()
export class UserManagementService extends CommonRestService {

  private static USERS_URL = '/api/users';


  constructor(http: Http) {
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
}

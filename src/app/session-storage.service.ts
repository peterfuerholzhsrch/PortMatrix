import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable()
export class SessionStorageService {
  private static  USER = "CREATION_BY";

  constructor() { }


  public getUser(): User {
    const userStr = sessionStorage.getItem(SessionStorageService.USER);
    return userStr ? User.jsonToObj(JSON.parse(userStr)) : null;
  }

  /**
   * Saves the user in the SessionStorage. Do mind that only following attributes get saved: _id, email
   * @param user
   */
  public setUser(user: User) {
    let userClone = undefined;
    if (user) {
      userClone = {};
      userClone.email = user.email;
      userClone._id = user.getId();
    }
    if (userClone) {
      sessionStorage.setItem(SessionStorageService.USER, JSON.stringify(userClone));
    }
    else {
      sessionStorage.removeItem(SessionStorageService.USER);
    }
  }
}

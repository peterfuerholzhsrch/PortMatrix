import { Injectable } from '@angular/core';
import { User } from './model/user';
import {Sorting} from  './model/sorting';


/**
 * Different settings get saved in the browser's session storage. With this we gain:
 * - user can reload page without getting logged out
 * - filter and sorting settings are saved over one user session (TODO save in local storage!)
 */
@Injectable()
export class SessionStorageService {
  private static USER = 'CREATION_BY';
  private static PROJECT_ID = 'PROJECT_ID';
  private static JWT_TOKEN = 'TOKEN';
  private static SEARCH_TERM = 'SEARCH_TERM';
  private static SORTING = 'SORTING';

  constructor() { }


  //
  // USER
  //

  getUser(): User {
    const userStr = sessionStorage.getItem(SessionStorageService.USER);
    return userStr ? User.jsonToObj(JSON.parse(userStr)) : null;
  }

  /**
   * Saves the user in the SessionStorage. Do mind that only following attributes get saved: _id, email
   * @param user
   */
  setUser(user: User) {
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


  //
  // PROJECT_ID
  //

  getProjectId(): string {
    return sessionStorage.getItem(SessionStorageService.PROJECT_ID);
  }

  setProjectId(projectId: string) {
    if (projectId) {
      sessionStorage.setItem(SessionStorageService.PROJECT_ID, projectId);
    }
    else {
      sessionStorage.removeItem(SessionStorageService.PROJECT_ID);
    }
  }

  //
  // JWT_TOKEN
  //

  getJwtToken(): string {
    return sessionStorage.getItem(SessionStorageService.JWT_TOKEN);
  }

  setJwtToken(jwtToken: string) {
    if (jwtToken) {
      sessionStorage.setItem(SessionStorageService.JWT_TOKEN, jwtToken);
    }
    else {
      sessionStorage.removeItem(SessionStorageService.JWT_TOKEN);
    }
  }


  //
  // NETWORK_SWITCHING
  //

  getSearchTerm(): string {
    return sessionStorage.getItem(SessionStorageService.SEARCH_TERM);
  }

  setSearchTerm(searchTerm: string) {
    if (searchTerm) {
      sessionStorage.setItem(SessionStorageService.SEARCH_TERM, searchTerm);
    }
    else {
      sessionStorage.removeItem(SessionStorageService.SEARCH_TERM);
    }
  }

  getSortingList(): Sorting[] {
    const sortingStr = sessionStorage.getItem(SessionStorageService.SORTING);
    const sortingList: Sorting[] = sortingStr ? Sorting.jsonArrToObjArr(JSON.parse(sortingStr)) : [];
    return sortingList;
  }

  setSortingList(sortingList: Sorting[]) {
    if (sortingList) {
      sessionStorage.setItem(SessionStorageService.SORTING, JSON.stringify(sortingList));
    }
    else {
      sessionStorage.removeItem(SessionStorageService.SORTING);
    }
  }
}

/**
 * Created by pfu on 25/01/17.
 */

import {User} from './user';
import {Project} from './project';


export class UserAndProject {
  public user: User;
  public project: Project;


  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {UserAndProject}
   */
  public static jsonToObj(jsonObj: Object): UserAndProject {
    const userAndProject = new UserAndProject();

    userAndProject.user = User.jsonToObj(jsonObj['user']);
    userAndProject.project = Project.jsonToObj(jsonObj['project']);

    return userAndProject;
  }
}
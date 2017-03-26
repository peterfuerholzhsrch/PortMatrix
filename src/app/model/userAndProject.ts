import {User} from './user';
import {Project} from './project';

/**
 * Model class for a User and his Project.
 */
export class UserAndProject {
  user: User;
  project: Project;


  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {UserAndProject}
   */
  static jsonToObj(jsonObj: Object): UserAndProject {
    if (!jsonObj) {
      throw new Error('There is no object to build a User and Project from!');
    }
    const userAndProject = new UserAndProject();

    userAndProject.user = User.jsonToObj(jsonObj['user']);
    userAndProject.project = Project.jsonToObj(jsonObj['project']);

    return userAndProject;
  }
}

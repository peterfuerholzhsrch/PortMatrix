import {IdBasedModel} from "./idBasedModel";
/**
 * Model class for projects.
 * Created by pfu on 12/01/17.
 */
export class Project extends IdBasedModel {

  adminId: string;
  users: Array<String>;
  name: string;
  creationDate: Date;


  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {Networkswitching}
   */
  public static jsonToObj(jsonObj: Object): Project {
    if (!jsonObj) {
      throw new Error('There is no object to build a Project from!');
    }
    const project: Project = Object.assign(new Project(), jsonObj);
    return project;
  }

  /**
   * Helper method for packing JSON array.
   * @param jsonArr
   * @returns {Array<User>}
   */
  public static jsonArrToObjArr(jsonArr: Array<Object>): Array<Project> {
    const projectArr: Array<Project> = [];
    if (jsonArr) {
      for (const json of jsonArr) {
        projectArr.push(this.jsonToObj(json));
      }
    }
    return projectArr;
  }
}

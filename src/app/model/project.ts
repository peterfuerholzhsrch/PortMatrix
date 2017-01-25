import {Endpoint} from "./endpoint";
import {Testresult} from "./testresult";


/**
 * Model class for projects.
 * Created by pfu on 12/01/17.
 */
export class Project {
  private _id: string;
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

  /**
   * TODO create base class!!!
   *
   * @returns {string}
   */
  public getId(): string {
    return this._id;
  }
}

import {IdBasedModel} from "./idBasedModel";

/**
 * Model class for users.
 */
export class User extends IdBasedModel {
  email: string;
  password: string;


  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {User}
   */
  static jsonToObj(jsonObj: Object): User {
    if (!jsonObj) {
      throw new Error('There is no object to build a User from!');
    }
    const user: User = Object.assign(new User(), jsonObj);
    return user;
  }

  getId(): string {
    return this._id;
  }

  updateUser(user) {
    Object.assign(this, user);
  }
}

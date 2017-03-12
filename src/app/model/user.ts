/**
 * Model class for users.
 * Created by pfu on 12/01/17.
 */
export class User {
  private _id: string = null;
  public email: string;
  public password: string;

  // TODO 'public' in networkswitching ???


  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {User}
   */
  public static jsonToObj(jsonObj: Object): User {
    if (!jsonObj) {
      throw new Error('There is no object to build a User from!');
    }
    const user: User = Object.assign(new User(), jsonObj);
    return user;
  }

  public getId(): string {
    return this._id;
  }

  public updateUser(user) {
    Object.assign(this, user);
  }
}

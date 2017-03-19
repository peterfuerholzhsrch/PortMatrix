/**
 * The IdBasedModel has a private ID which is used on the server side as a technical ID in the database.
 *
 * Created by pfu on 15/03/17.
 */
export abstract class IdBasedModel {
  protected _id: string = null;

  /**
   * @returns {string}
   */
  public getId(): string {
    return this._id;
  }
}

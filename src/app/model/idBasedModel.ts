/**
 * The IdBasedModel has a private ID which is used on the server side as a technical ID in the database.
 */
export abstract class IdBasedModel {
  protected _id: string = null;

  /**
   * @returns {string}
   */
  getId(): string {
    return this._id;
  }
}

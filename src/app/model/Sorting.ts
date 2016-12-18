/**
 * Created by pfu on 18/12/16.
 */

export class Sorting {
  public constructor(public text: String, public dbColumn: String, public ascending: boolean) {
  }

  public toRestQuery() {
    return (this.ascending ? "+" : "-") + this.dbColumn;
  }
}

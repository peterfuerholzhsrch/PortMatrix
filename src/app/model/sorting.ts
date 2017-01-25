/**
 * Created by pfu on 18/12/16.
 */

export class Sorting {
  public constructor(public text: String, public dbColumn: String, public ascending: boolean) {
  }

  public toRestQuery(): string {
    return (this.ascending ? "+" : "-") + this.dbColumn;
  }


  public static ID = new Sorting("ID", "id", true);
  public static STATE = new Sorting("State", "state", true);
  public static USER = new Sorting("User", "user", true);
  public static TEST_STATE = new Sorting("Test State", "testState", true); // TODO does not yet exist in the DB
  public static SOURCE_GROUP = new Sorting("Source Group", "source.group", true);
  public static SOURCE_HOST = new Sorting("Source Host", "source.host", true);
  public static SOURCE_IP = new Sorting("Source IP", "source.ipAddr", true);
  public static SOURCE_ZONE = new Sorting("Source Zone", "source.zone", true);
  public static DESTINATION_GROUP = new Sorting("Destination Group", "destination.group", true);
  public static DESTINATION_HOST = new Sorting("Destination Host", "destination.host", true);
  public static DESTINATION_IP = new Sorting("Destination IP", "destination.ipAddr", true);
  public static DESTINATION_ZONE = new Sorting("Destination Zone", "destination.zone", true);
  public static DESTINATION_PORT = new Sorting("Destination Port(s)", "destination.port", true);
  public static PROTOCOL = new Sorting("Protocol", "protocol", true);
  public static REMARK = new Sorting("Remark", "remark", true);

  static ALL_SORTINGS: Array<Sorting> = [];
  static init() {
    this.ALL_SORTINGS.push(this.ID);
    this.ALL_SORTINGS.push(this.STATE);
    this.ALL_SORTINGS.push(this.USER);
    this.ALL_SORTINGS.push(this.TEST_STATE);
    this.ALL_SORTINGS.push(this.SOURCE_GROUP);
    this.ALL_SORTINGS.push(this.SOURCE_HOST);
    this.ALL_SORTINGS.push(this.SOURCE_IP);
    this.ALL_SORTINGS.push(this.SOURCE_ZONE);
    this.ALL_SORTINGS.push(this.DESTINATION_GROUP);
    this.ALL_SORTINGS.push(this.DESTINATION_HOST);
    this.ALL_SORTINGS.push(this.DESTINATION_IP);
    this.ALL_SORTINGS.push(this.DESTINATION_ZONE);
    this.ALL_SORTINGS.push(this.DESTINATION_PORT);
    this.ALL_SORTINGS.push(this.PROTOCOL);
    this.ALL_SORTINGS.push(this.REMARK);
  }

  public static getSortingByDbColumn(dbColumn: string): Sorting {
    return this.ALL_SORTINGS.find(sorting => sorting.dbColumn == dbColumn);
  }
}
Sorting.init();

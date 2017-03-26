
/**
 * Model class for sorting network switchings.
 */
export class Sorting {

  constructor(public text: String, public dbColumn: String, public ascending: boolean) {
  }


  toRestQuery(): string {
    return (this.ascending ? "+" : "-") + this.dbColumn;
  }


  static ID = new Sorting("ID", "id", true);
  static STATE = new Sorting("State", "state", true);
  static CREATION_BY = new Sorting("Creator", "creationBy", true);
  static TEST_STATE = new Sorting("Test State", "testresultList.result", true);
  static SOURCE_GROUP = new Sorting("Source Group", "source.group", true);
  static SOURCE_HOST = new Sorting("Source Host", "source.host", true);
  static SOURCE_IP = new Sorting("Source IP", "source.ipAddr", true);
  static SOURCE_ZONE = new Sorting("Source Zone", "source.zone", true);
  static DESTINATION_GROUP = new Sorting("Destination Group", "destination.group", true);
  static DESTINATION_HOST = new Sorting("Destination Host", "destination.host", true);
  static DESTINATION_IP = new Sorting("Destination IP", "destination.ipAddr", true);
  static DESTINATION_ZONE = new Sorting("Destination Zone", "destination.zone", true);
  static DESTINATION_PORT = new Sorting("Destination Port(s)", "destination.port", true);
  static PROTOCOL = new Sorting("Protocol", "protocol", true);
  static REMARK = new Sorting("Remark", "remark", true);

  static ALL_SORTINGS: Array<Sorting> = [];
  static init() {
    this.ALL_SORTINGS.push(this.ID);
    this.ALL_SORTINGS.push(this.STATE);
    this.ALL_SORTINGS.push(this.CREATION_BY);
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

  static getSortingByDbColumn(dbColumn: string): Sorting {
    return this.ALL_SORTINGS.find(sorting => sorting.dbColumn == dbColumn);
  }

  static getSortingIndexByDbColumn(sortingList: Sorting[], dbColumn: string): number {
    return sortingList.findIndex(sorting => sorting.dbColumn == dbColumn);
  }

  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {any}
   */
  static jsonToObj(jsonObj: Object): Sorting {
    if (!jsonObj) {
      throw new Error('There is no object to build a Sorting from!');
    }
    return Object.assign(new Sorting(null, null, false), jsonObj);
  }

  /**
   * Helper method for packing JSON array.
   * @param jsonArr
   * @returns {Array<Sorting>}
   */
  static jsonArrToObjArr(jsonArr: Array<Object>): Array<Sorting> {
    const sortingArr: Array<Sorting> = [];
    if (jsonArr) {
      for (const json of jsonArr) {
        sortingArr.push(this.jsonToObj(json));
      }
    }
    return sortingArr;
  }
}
Sorting.init();

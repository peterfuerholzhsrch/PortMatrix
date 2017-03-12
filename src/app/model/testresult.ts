/**
 * Created by pfu on 15/11/16.
 */

export class Testresult {

  constructor(public result?: boolean, public timestamp?: Date) {
  }

  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {any}
   */
  public static jsonToObj(jsonObj: Object): Testresult {
    if (!jsonObj) {
      throw new Error('There is no object to build a Testresult from!');
    }
    const testresult = Object.assign(new Testresult(), jsonObj);
    return testresult;
  }

  /**
   * Helper method for packing JSON array.
   * @param jsonArr
   * @returns {Array<Testresult>}
   */
  public static jsonArrToObjArr(jsonArr: Array<Object>): Array<Testresult> {
    const testresultArr: Array<Testresult> = [];
    if (jsonArr) {
      for (const json of jsonArr) {
        testresultArr.push(this.jsonToObj(json));
      }
    }
    return testresultArr;
  }
}

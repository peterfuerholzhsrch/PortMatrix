import {Endpoint} from "./endpoint";
import {Testresult} from "./testresult";


/**
 * Created by pfu on 15/11/16.
 */
export class Networkswitching {
  _id: string = null;
  id: number;
  source: Endpoint;
  destination: Endpoint;
  protocol: string;
  state: string;
  remark: string;
  user: string;
  testresultList: Array<Testresult>;
  creationDate: Date;
  lastchangeDate: Date;

  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {Networkswitching}
   */
  public static jsonToObj(jsonObj: Object): Networkswitching {
    const networkswitching: Networkswitching = Object.assign(new Networkswitching(), jsonObj);
    networkswitching.source = Endpoint.jsonToObj(jsonObj['source']);
    networkswitching.destination = Endpoint.jsonToObj(jsonObj['destination']);
    networkswitching.testresultList = Testresult.jsonArrToObjArr(jsonObj['testresultList']);
    return networkswitching;
  }

  /**
   * Helper method for packing JSON array.
   * @param jsonArr
   * @returns {Array<Networkswitching>}
   */
  public static jsonArrToObjArr(jsonArr: Array<Object>): Array<Networkswitching> {
    const networkswitchingArr: Array<Networkswitching> = [];
    if (jsonArr) {
      for (const json of jsonArr) {
        networkswitchingArr.push(this.jsonToObj(json));
      }
    }
    return networkswitchingArr;
  }


  /**
   * @returns {boolean} null if not available
   */
  public getLastTeststate() : Boolean {
    return (this.testresultList && this.testresultList.length > 0) ? this.testresultList[this.testresultList.length-1].result : null;
  }

  public getId(): string {
    return this._id;
  }
}

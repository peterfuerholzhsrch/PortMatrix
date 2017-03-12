import {Endpoint} from "./endpoint";
import {Testresult} from "./testresult";
import {SystemEnvironment, SYSTEM_ENVIRONMENTS} from "./systemEnvironment";

/**
 * Model class for Network Switchings.
 * Created by pfu on 15/11/16.
 */
export class Networkswitching {
  private _id: string = null;
  id: number;
  systemEnvironment: string = SystemEnvironment[SystemEnvironment.INTEGRATION_SYSTEM];
  source: Endpoint;
  destination: Endpoint;
  protocol: string;
  state: string = Networkswitching.STATES[0];
  remark: string;
  testresultList: Array<Testresult>;
  creationDate: Date;
  creationBy: string;
  lastchangeDate: Date;
  lastchangeBy: string;

  public static ZONES: Array<string> = ['yellow', 'orange', 'red'];
  public static STATES: Array<string> = ['To be implemented', 'Implemented', 'To be deleted', 'Deleted'];

  // from http://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address:
  public static HOST_REGEX: string = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$";
  // we allow to IP addresses with ranges, e.g. 127.202.12.1-128
  public static IP_RANGE_REGEX: string = "^[0-9.-]+$";

  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {Networkswitching}
   */
  public static jsonToObj(jsonObj: Object): Networkswitching {
    if (!jsonObj) {
      throw new Error('There is no object to build a Network Switching from!');
    }
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
  public getLastTeststateResult() : Boolean {
    return (this.testresultList && this.testresultList.length > 0) ? this.testresultList[this.testresultList.length-1].result : null;
  }

  /**
   * @returns {Date} null if not available
   */
  public getLastTeststateTimestamp() : Date {
    return (this.testresultList && this.testresultList.length > 0) ? this.testresultList[this.testresultList.length-1].timestamp : null;
  }

  public addTestresult(success: boolean, timestamp: Date) {
    this.testresultList.push(new Testresult(success, timestamp));
  }


  public getId(): string {
    return this._id;
  }


  public getSystemEnvironmentCssClass(): string {
    const foundIndex = SystemEnvironment.getIndex(this.systemEnvironment);
    const cssClass = SystemEnvironment.getCssClass(SYSTEM_ENVIRONMENTS[foundIndex]);
    return cssClass;
  }
}

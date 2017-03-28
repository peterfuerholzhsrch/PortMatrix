import {Endpoint} from "./endpoint";
import {Testresult} from "./testresult";
import {SystemEnvironment, SYSTEM_ENVIRONMENTS} from "./systemEnvironment";
import {IdBasedModel} from "./idBasedModel";

/**
 * Model class for Network Switchings.
 *
 * Please notice!
 * If you add/remove attributes or change the data type you probably have to update following server code as well:
 * - controller/networkswitchingsController.js (query- / sortings parameter)
 * - test/fillExampleData.js
 */
export class Networkswitching extends IdBasedModel {

  id: string;
  systemEnvironment: string = SystemEnvironment[SystemEnvironment.INTEGRATION_SYSTEM];
  source: Endpoint;
  destination: Endpoint;
  protocol: Array<string> = [];
  state: string = Networkswitching.STATES[0];
  remark: string;
  testresultList: Array<Testresult> = [];
  creationDate: Date;
  creationBy: string;
  lastchangeDate: Date;
  lastchangeBy: string;

  static ZONES: Array<string> = ['yellow', 'orange', 'red'];
  static STATES: Array<string> = ['To be implemented', 'Implemented', 'To be deleted', 'Deleted'];
  static PROTOCOLS: Array<string> = ['oracle-jdbc', 'http', 'https', 'sftp', 'db2-jdbc', 'ssh'];
  // from http://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address:
  static HOST_REGEX: string = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$";
  // we allow to IP addresses with ranges, e.g. 127.202.12.1-128
  static IP_RANGE_REGEX: string = "^[0-9.-]+$";

  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {Networkswitching}
   */
  static jsonToObj(jsonObj: Object): Networkswitching {
    if (!jsonObj) {
      throw new Error('There is no object to build a Network Switching from!');
    }
    const networkswitching: Networkswitching = Object.assign(new Networkswitching(), jsonObj);
    networkswitching.source = Endpoint.jsonToObj(jsonObj['source']);
    networkswitching.destination = Endpoint.jsonToObj(jsonObj['destination']);
    networkswitching.testresultList = Testresult.jsonArrToObjArr(jsonObj['testresultList']);
    // objectify protocol-array:
    var protocolList: Array<string> = [];
    networkswitching['protocol'] = protocolList;
    if (jsonObj['protocol'] instanceof Array) {
      for (const protocolJson of jsonObj['protocol']) {
        protocolList.push(protocolJson);
      }
    }
    else {
      // protocol just a string:
      protocolList.push(jsonObj['protocol']);
    }
    if (jsonObj['creationDate']) {
      networkswitching.creationDate = new Date(jsonObj['creationDate']);
    }
    if (jsonObj['lastchangeDate']) {
      networkswitching.lastchangeDate = new Date(jsonObj['lastchangeDate']);
    }
    return networkswitching;
  }

  /**
   * Helper method for packing JSON array.
   * @param jsonArr
   * @returns {Array<Networkswitching>}
   */
  static jsonArrToObjArr(jsonArr: Array<Object>): Array<Networkswitching> {
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
  getLastTeststateResult() : Boolean {
    return (this.testresultList && this.testresultList.length > 0) ? this.testresultList[this.testresultList.length-1].result : null;
  }

  /**
   * @returns {Date} null if not available
   */
  getLastTeststateTimestamp() : Date {
    return (this.testresultList && this.testresultList.length > 0) ? this.testresultList[this.testresultList.length-1].timestamp : null;
  }

  addTestresult(success: boolean, timestamp: Date) {
    this.testresultList.push(new Testresult(success, timestamp));
  }


  getSystemEnvironmentCssClass(): string {
    const foundIndex = SystemEnvironment.getIndex(this.systemEnvironment);
    return SystemEnvironment.getCssClass(SYSTEM_ENVIRONMENTS[foundIndex]);
  }
}

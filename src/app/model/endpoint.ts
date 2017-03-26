import {Networkswitching} from "./networkswitching";


/**
 * Model for a NetworkSwitching's endpoint. This class is used for destination and source.
 */
export class Endpoint {
  group: string;
  host: string;
  ipAddr: string;
  zone: string = Networkswitching.ZONES[0];
  port: string; // only needed on Destination!


  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {any}
   */
  static jsonToObj(jsonObj: Object): Endpoint {
    if (!jsonObj) {
      throw new Error('There is no object to build an Endpoint from!');
    }
    const endpoint = Object.assign(new Endpoint(), jsonObj);
    return endpoint;
  }

  /**
   * Helper method for packing JSON array.
   * @param jsonArr
   * @returns {Array<Endpoint>}
   */
  static jsonArrToObjArr(jsonArr: Array<Object>): Array<Endpoint> {
    const endpointArr: Array<Endpoint> = [];
    if (jsonArr) {
      for (const json of jsonArr) {
        endpointArr.push(this.jsonToObj(json));
      }
    }
    return endpointArr;
  }
}

/**
 * Created by pfu on 15/11/16.
 */

export class Endpoint {
  group: string;
  host: string;
  ipAddr: string;
  zone: string;
  port: string; // only needed on Destination!


  /**
   * Helper method for packing JSON object.
   * @param jsonObj
   * @returns {any}
   */
  public static jsonToObj(jsonObj: Object): Endpoint {
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
  public static jsonArrToObjArr(jsonArr: Array<Object>): Array<Endpoint> {
    const endpointArr: Array<Endpoint> = [];
    if (jsonArr) {
      for (const json of jsonArr) {
        endpointArr.push(this.jsonToObj(json));
      }
    }
    return endpointArr;
  }
}

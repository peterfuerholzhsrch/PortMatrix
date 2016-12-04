import {Endpoint} from "./endpoint";
import {Testresult} from "./testresult";


/**
 * Created by pfu on 15/11/16.
 */
export class Networkswitching {
  id: number;
  source: Endpoint;
  destination: Endpoint;
  protocol: string;
  status: string;
  remark: string;
  testresultList: Testresult[];
  creationDate: Date;
  lastchangeDate: Date;

  /**
   * @returns {boolean} null if not available
   */
  public getLastTeststate() : Boolean {
    return this.testresultList ? this.testresultList[this.testresultList.length-1].result : null;
  }
}

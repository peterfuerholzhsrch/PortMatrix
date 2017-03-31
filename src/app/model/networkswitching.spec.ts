import {Networkswitching} from './networkswitching';
import {SystemEnvironment} from './systemEnvironment';
import {Endpoint} from './endpoint';

/**
 * The tests here cover following model classes:
 * - Networkswitching
 * - Testresult
 * - Endpoint
 */

const ID = 'A1';
const SYSTEM_ENVIRONMENT = SystemEnvironment[SystemEnvironment.DEVELOPMENT_SYSTEM];

const SOURCE_GROUP = 'srcGroup';
const SOURCE_HOST = 'srcHost';
const SOURCE_IPADDR = '123.12.11.1';
const SOURCE_ZONE = Networkswitching.ZONES[1];

const DESTINATION_GROUP = 'srcGroup';
const DESTINATION_HOST = 'srcHost';
const DESTINATION_IPADDR = '123.12.11.1';
const DESTINATION_ZONE = Networkswitching.ZONES[1];
const DESTINATION_PORT = '122-124';

const PROTOCOLS = [ Networkswitching.PROTOCOLS[1], Networkswitching.PROTOCOLS[3] ];
const STATE = Networkswitching.STATES[2];
const REMARK = 'Just a remark!';
const CREATION_DATE = new Date(2016, 12, 31, 23, 58, 59);
const LAST_CHANGE_DATE = new Date(2017, 3, 30, 12, 30, 59);
const CREATION_BY = 'user1';
const LAST_CHANGE_BY = 'userX';

const TESTRESULT1_DATE = new Date(2017, 2, 21, 2, 57, 59);
const TESTRESULT2_DATE = new Date(2017, 3, 30, 1, 1, 3);

function createNwsw(): Networkswitching {
  const networkswitching = new Networkswitching();
  networkswitching.id = ID;
  networkswitching.systemEnvironment = SYSTEM_ENVIRONMENT;

  const source = new Endpoint();
  source.group = SOURCE_GROUP;
  source.host = SOURCE_HOST;
  source.ipAddr = SOURCE_IPADDR;
  source.zone = SOURCE_ZONE;
  networkswitching.source = source;

  const destination = new Endpoint();
  destination.group = DESTINATION_GROUP;
  destination.host = DESTINATION_HOST;
  destination.ipAddr = DESTINATION_IPADDR;
  destination.zone = DESTINATION_ZONE;
  destination.port = DESTINATION_PORT;
  networkswitching.destination = destination;

  networkswitching.protocol = PROTOCOLS;
  networkswitching.state = STATE;
  networkswitching.remark = REMARK;
  networkswitching.creationDate = CREATION_DATE;
  networkswitching.creationBy = CREATION_BY;
  networkswitching.lastchangeDate = LAST_CHANGE_DATE;
  networkswitching.lastchangeBy = LAST_CHANGE_BY;
  return networkswitching;
}


describe('Networkswitching', () => {
  it('create an instance', () => {
    const nwsw = new Networkswitching();
    expect(nwsw).toBeTruthy();
  });


  it('to json and back and compare', () => {

    const nwsw = createNwsw();

    const json = JSON.stringify(nwsw);

    const unstringified: Networkswitching = Networkswitching.jsonToObj(JSON.parse(json));

    //
    // check separately to find difference easier:
    //
    expect(unstringified.id).toBe(ID);
    expect(unstringified.systemEnvironment).toBe(SYSTEM_ENVIRONMENT);

    expect(unstringified.source.group).toBe(SOURCE_GROUP);
    expect(unstringified.source.host).toBe(SOURCE_HOST);
    expect(unstringified.source.ipAddr).toBe(SOURCE_IPADDR);
    expect(unstringified.source.zone).toBe(SOURCE_ZONE);

    expect(unstringified.destination.group).toBe(DESTINATION_GROUP);
    expect(unstringified.destination.host).toBe(DESTINATION_HOST);
    expect(unstringified.destination.ipAddr).toBe(DESTINATION_IPADDR);
    expect(unstringified.destination.zone).toBe(DESTINATION_ZONE);
    expect(unstringified.destination.port).toBe(DESTINATION_PORT);

    expect(unstringified.protocol).toEqual(PROTOCOLS);
    expect(unstringified.state).toBe(STATE);
    expect(unstringified.remark).toBe(REMARK);
    expect(unstringified.creationDate).toEqual(CREATION_DATE);
    expect(unstringified.creationBy).toBe(CREATION_BY);
    expect(unstringified.lastchangeDate).toEqual(LAST_CHANGE_DATE);
    expect(unstringified.lastchangeBy).toBe(LAST_CHANGE_BY);

    expect(unstringified).toEqual(nwsw);
  });


  it('Networkswitching\'s testresults to json and back and compare', () => {
    const nwsw = createNwsw();

    nwsw.addTestresult(true, TESTRESULT1_DATE);
    nwsw.addTestresult(false, TESTRESULT2_DATE);

    const json = JSON.stringify(nwsw);

    const unstringified: Networkswitching = Networkswitching.jsonToObj(JSON.parse(json));

    expect(unstringified.testresultList).toEqual(nwsw.testresultList);
    expect(unstringified).toEqual(nwsw);
  });


  it('check multiple nwsws to json and back and compare', () => {
    const nwsw1 = createNwsw();
    nwsw1.addTestresult(true, TESTRESULT1_DATE);

    const nwsw2 = createNwsw();
    nwsw2.id = 'A2';
    nwsw2.addTestresult(false, TESTRESULT2_DATE);

    const nwswArr = [ nwsw1, nwsw2 ];

    const json = JSON.stringify(nwswArr);
    console.log('jsonArr', json);

    const unstringified: Networkswitching[] = Networkswitching.jsonArrToObjArr(JSON.parse(json));

    expect(unstringified).toEqual(nwswArr);
  });

});

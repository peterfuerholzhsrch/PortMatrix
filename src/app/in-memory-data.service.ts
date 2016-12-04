/**
 * Created by pfu on 01/12/16.
 */

import {InMemoryDbService} from 'angular-in-memory-web-api';


/**
 * Stub backend for development / test.
 */
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let nwsw = [
      {
        id: 11, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '122-133'}
      },
      {
        id: 12, state: 'Implemented',
        source: {group: 'SZP', host: 'swbwz', ipAddr: '10.100.128.18', zone: 'rot'},
        destination: {group: 'SZD', host: 'swbwz', ipAddr: '20.030.168.17', zone: 'gelb', port: '16000'}
      },
      {
        id: 13, state: 'Implemented',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '8080'}
      },
      {
        id: 14, state: 'Deleted',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'gelb', port: '8080, 8088'}
      },
      {
        id: 15, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '10'}
      }
    ];
    return { nwsw }; // 'nwsw' has to correspond to REST-call 'app/nwsw'  as invoked by NetworkswitchingService!!
  }
}

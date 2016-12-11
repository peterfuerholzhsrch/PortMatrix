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
      },

      {
        id: 16, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '122-133'}
      },
      {
        id: 17, state: 'Implemented',
        source: {group: 'SZP', host: 'swbwz', ipAddr: '10.100.128.18', zone: 'rot'},
        destination: {group: 'SZD', host: 'swbwz', ipAddr: '20.030.168.17', zone: 'gelb', port: '16000'}
      },
      {
        id: 18, state: 'Implemented',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '8080'}
      },
      {
        id: 19, state: 'Deleted',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'gelb', port: '8080, 8088'}
      },
      {
        id: 20, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '10'}
      },

      {
        id: 21, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '122-133'}
      },
      {
        id: 22, state: 'Implemented',
        source: {group: 'SZP', host: 'swbwz', ipAddr: '10.100.128.18', zone: 'rot'},
        destination: {group: 'SZD', host: 'swbwz', ipAddr: '20.030.168.17', zone: 'gelb', port: '16000'}
      },
      {
        id: 23, state: 'Implemented',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '8080'}
      },
      {
        id: 24, state: 'Deleted',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'gelb', port: '8080, 8088'}
      },
      {
        id: 25, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '10'}
      },

      {
        id: 26, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '122-133'}
      },
      {
        id: 27, state: 'Implemented',
        source: {group: 'SZP', host: 'swbwz', ipAddr: '10.100.128.18', zone: 'rot'},
        destination: {group: 'SZD', host: 'swbwz', ipAddr: '20.030.168.17', zone: 'gelb', port: '16000'}
      },
      {
        id: 28, state: 'Implemented',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '8080'}
      },
      {
        id: 29, state: 'Deleted',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'gelb', port: '8080, 8088'}
      },
      {
        id: 30, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '10'}
      },

      {
        id: 31, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '122-133'}
      },
      {
        id: 32, state: 'Implemented',
        source: {group: 'SZP', host: 'swbwz', ipAddr: '10.100.128.18', zone: 'rot'},
        destination: {group: 'SZD', host: 'swbwz', ipAddr: '20.030.168.17', zone: 'gelb', port: '16000'}
      },
      {
        id: 33, state: 'Implemented',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '8080'}
      },
      {
        id: 34, state: 'Deleted',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'gelb', port: '8080, 8088'}
      },
      {
        id: 35, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '10'}
      },

      {
        id: 36, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '122-133'}
      },
      {
        id: 37, state: 'Implemented',
        source: {group: 'SZP', host: 'swbwz', ipAddr: '10.100.128.18', zone: 'rot'},
        destination: {group: 'SZD', host: 'swbwz', ipAddr: '20.030.168.17', zone: 'gelb', port: '16000'}
      },
      {
        id: 38, state: 'Implemented',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '8080'}
      },
      {
        id: 39, state: 'Deleted',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'gelb', port: '8080, 8088'}
      },
      {
        id: 40, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '10'}
      },

      {
        id: 41, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '122-133'}
      },
      {
        id: 42, state: 'Implemented',
        source: {group: 'SZP', host: 'swbwz', ipAddr: '10.100.128.18', zone: 'rot'},
        destination: {group: 'SZD', host: 'swbwz', ipAddr: '20.030.168.17', zone: 'gelb', port: '16000'}
      },
      {
        id: 43, state: 'Implemented',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '8080'}
      },
      {
        id: 44, state: 'Deleted',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'orange'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'gelb', port: '8080, 8088'}
      },
      {
        id: 45, state: 'Pending',
        source: {group: 'SZP', host: 'swawz', ipAddr: '10.100.127.18', zone: 'braun'},
        destination: {group: 'SZD', host: 'bwawa', ipAddr: '20.030.168.17', zone: 'rot', port: '10'}
      }

    ];
    return { nwsw }; // 'nwsw' has to correspond to REST-call 'app/nwsw'  as invoked by NetworkswitchingService!!
  }
}

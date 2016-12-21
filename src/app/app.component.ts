import { Component, ViewEncapsulation} from '@angular/core';
import { NetworkswitchingService } from './networkswitching.service';
import { Networkswitching } from './model/networkswitching';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'PortMatrix app works!';

  constructor(private networkswitchingService: NetworkswitchingService) {
  }


  insert(): void {

    this.networkswitchingService.insert({
      "id": 99,
      "state": "Pending",
      "source": {
        "group": "AAAAAA",
        "host": "aaaa",
        "ipAddr": "44.100.127.18",
        "zone": "braun",
        "port": null
      },
      "destination": {
        "group": "BBBBBB",
        "host": "bbbb",
        "ipAddr": "77.030.168.17",
        "zone": "rot",
        "port": "10"
      },
      "protocol": "tcp",
      "remark": null
    } as Networkswitching);
  }

}

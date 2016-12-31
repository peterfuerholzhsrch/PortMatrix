import { Component, ViewEncapsulation} from '@angular/core';
import { NetworkswitchingService } from '../networkswitching.service';
import { Networkswitching } from '../model/networkswitching';
import {Response} from "@angular/http";


@Component({
  selector: 'app-root',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
  title = 'PortMatrix app works!';

  errorMessage = '';

  constructor(private networkswitchingService: NetworkswitchingService) {
  }
}

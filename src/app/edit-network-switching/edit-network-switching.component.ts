import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Networkswitching} from "../model/networkswitching";
import {Params, ActivatedRoute} from "@angular/router";
import { NetworkswitchingService } from '../networkswitching.service';

@Component({
  selector: 'edit-network-switching',
  templateUrl: 'edit-network-switching.component.html',
  styleUrls: ['edit-network-switching.component.scss']
})
export class EditNetworkSwitchingComponent implements OnInit {
  nwsw: Networkswitching;

  constructor(
    private networkswitchingService: NetworkswitchingService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.networkswitchingService.getNetworkswitching(+params['id']))
      .subscribe(nwsw => this.nwsw = nwsw);
  }

  save(): void {
    this.networkswitchingService.update(this.nwsw)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

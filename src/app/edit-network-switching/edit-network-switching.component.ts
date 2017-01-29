import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Networkswitching} from "../model/networkswitching";
import {Params, ActivatedRoute} from "@angular/router";
import { NetworkswitchingService } from '../networkswitching.service';
import {UserManagementService} from "../user-management.service";

@Component({
  selector: 'edit-network-switching',
  templateUrl: 'edit-network-switching.component.html',
  styleUrls: ['edit-network-switching.component.scss']
})
export class EditNetworkSwitchingComponent implements OnInit {
  private nwsw: Networkswitching;

  constructor(
    private networkswitchingService: NetworkswitchingService,
    private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.networkswitchingService.getNetworkswitching(params['id']))
      .subscribe(nwsw => this.nwsw = nwsw);

  }

  save(): void {
    this.nwsw.lastchangeDate = new Date();
    // TODO: set User mail
    this.networkswitchingService.updateNetworkswitching(this.nwsw)
      .then(() => this.goBack());
  }

  delete(): void {
    this.networkswitchingService.deleteNetworkswitching(this.nwsw)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

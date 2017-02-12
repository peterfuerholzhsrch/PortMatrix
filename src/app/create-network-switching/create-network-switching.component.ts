import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Networkswitching} from "../model/networkswitching";
import {Params, ActivatedRoute} from "@angular/router";
import { NetworkswitchingService } from '../networkswitching.service';
import {Endpoint} from "../model/endpoint";
import {User} from "../model/user";
import {UserManagementService} from "../user-management.service";


@Component({
  selector: 'create-network-switching',
  templateUrl: './create-network-switching.component.html',
  styleUrls: ['./create-network-switching.component.scss']
})
export class CreateNetworkSwitchingComponent implements OnInit {
  nwsw: Networkswitching;
  private projectId: string;

  constructor(
    private networkswitchingService: NetworkswitchingService,
    private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.nwsw = new Networkswitching();
    this.nwsw.source = new Endpoint();
    this.nwsw.destination = new Endpoint();
    this.route.params
      .switchMap((params: Params) => {
        console.log("create-nwsw project-id=" + params['projectId']); // tODO del!!
        this.projectId = params['projectId'];
        return this.projectId;
      })
      .subscribe();
  }

  save(): void {
    this.nwsw.creationDate = new Date();
    const user: User = this.userManagementService.getUser();
    this.nwsw.creationBy = user.email;
    this.nwsw.lastchangeBy = user.email;
    this.networkswitchingService.insertNetworkswitching(this.projectId, this.nwsw)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  zones: Array<string> = ['yellow', 'orange', 'red'];
}

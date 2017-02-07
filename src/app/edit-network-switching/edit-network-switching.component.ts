import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Networkswitching} from "../model/networkswitching";
import {Params, ActivatedRoute} from "@angular/router";
import {NetworkswitchingService} from '../networkswitching.service';
import {FormGroup, Validators, FormControl, FormBuilder} from "@angular/forms";
import {SessionStorageService} from "../session-storage.service";

@Component({
  selector: 'edit-network-switching',
  templateUrl: 'edit-network-switching.component.html',
  styleUrls: ['edit-network-switching.component.scss']
})
export class EditNetworkSwitchingComponent implements OnInit {
  private nwsw: Networkswitching;
  private projectId: string;

  constructor(
    private networkswitchingService: NetworkswitchingService,
    private sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        this.projectId = params['projectId'];
        console.log("edit-nwsw project-id=" + this.projectId); // tODO del!!
        return this.networkswitchingService.getNetworkswitching(this.projectId, params['id'])
      })
      .subscribe(nwsw => this.nwsw = nwsw);

  }


  save(): void {
    this.nwsw.lastchangeDate = new Date();
    this.nwsw.lastchangeBy = this.sessionStorageService.getUser().email;
    this.networkswitchingService.updateNetworkswitching(this.projectId, this.nwsw)
      .then(() => this.goBack());
  }

  delete(): void {
    this.networkswitchingService.deleteNetworkswitching(this.projectId, this.nwsw)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Networkswitching} from "../model/networkswitching";
import {Params, ActivatedRoute} from "@angular/router";
import {NetworkswitchingService} from '../networkswitching.service';
import {UserManagementService} from "../user-management.service";


@Component({
  selector: 'edit-network-switching',
  templateUrl: 'edit-network-switching.component.html',
  styleUrls: ['edit-network-switching.component.scss']
})
export class EditNetworkSwitchingComponent implements OnInit {
  private nwsw: Networkswitching;
  private projectId: string;
  private testresultTimestamp: Date = new Date();

  constructor(
    private networkswitchingService: NetworkswitchingService,
    private userManagementService: UserManagementService,
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
    this.nwsw.lastchangeBy = this.userManagementService.getUser().email;
    this.networkswitchingService.updateNetworkswitching(this.projectId, this.nwsw)
      .then(() => this.goBack());
  }

  delete(): void {
    this.networkswitchingService.deleteNetworkswitching(this.projectId, this.nwsw)
      .then(() => this.goBack());
  }


  addTestresult(success: boolean) {
    console.log("addTestresult succss=" + success + " timestamp=" + this.testresultTimestamp);
    this.nwsw.addTestresult(success, this.testresultTimestamp);
    this.save();
  }

  goBack(): void {
    this.location.back();
  }

  zones: Array<string> = ['yellow', 'orange', 'red'];
  states: Array<string> = ['Implemented', 'Deleted', 'Delete'];

}

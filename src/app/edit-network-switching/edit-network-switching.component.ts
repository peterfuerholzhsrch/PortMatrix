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
  public testresultTimestampStr: string;


  constructor(
    private networkswitchingService: NetworkswitchingService,
    private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        const projectId = params['projectId'];
        this.userManagementService.setProjectId(projectId);
        console.log("edit-nwsw project-id=" + projectId); // tODO del!!
        return this.networkswitchingService.getNetworkswitching(projectId, params['id'])
      })
      .subscribe(nwsw => this.nwsw = nwsw);

    let date = new Date();
    date.setSeconds(0, 0);
    this.testresultTimestampStr = date.toJSON(); // format: (example) '2014-01-02T11:42:13.510';
    this.testresultTimestampStr = this.testresultTimestampStr.substr(0, this.testresultTimestampStr.length-2);
  }


  save(): void {
    this.nwsw.lastchangeDate = new Date();
    this.nwsw.lastchangeBy = this.userManagementService.getUser().email;
    this.networkswitchingService.updateNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
      .then(() => this.goBack());
  }


  delete(): void {
    this.networkswitchingService.deleteNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
      .then(() => this.goBack());
  }


  addTestresult(success: boolean) {
    if (this.testresultTimestampStr) {
      const testresultTimestamp = new Date(Date.parse(this.testresultTimestampStr));
      console.log("addTestresult success=" + success + " timestamp=" + testresultTimestamp); // TODO del

      this.nwsw.addTestresult(success, testresultTimestamp);
      this.save();
    }
  }

  goBack(): void {
    this.location.back();
  }

  zones: Array<string> = ['yellow', 'orange', 'red'];
  states: Array<string> = ['Implemented', 'Deleted', 'Delete'];

}

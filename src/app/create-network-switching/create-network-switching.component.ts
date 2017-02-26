import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Networkswitching} from "../model/networkswitching";
import {Params, ActivatedRoute} from "@angular/router";
import { NetworkswitchingService } from '../networkswitching.service';
import {Endpoint} from "../model/endpoint";
import {User} from "../model/user";
import {UserManagementService} from "../user-management.service";
import {SystemEnvironment, SYSTEM_ENVIRONMENTS} from '../model/systemEnvironment';

import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'create-network-switching',
  templateUrl: './create-network-switching.component.html',
  styleUrls: ['./create-network-switching.component.scss']
})
export class CreateNetworkSwitchingComponent implements OnInit {
  nwsw: Networkswitching;

  // used by template:
  ZONES = Networkswitching.ZONES;
  // used by template:
  STATES = Networkswitching.STATES;
  // used by template:
  SYSTEM_ENVIRONMENTS = SYSTEM_ENVIRONMENTS.map(system => SystemEnvironment.text(system));


  @ViewChild('createForm') public editForm: NgForm;

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
        const projectId = params['projectId'];
        this.userManagementService.setProjectId(projectId);
        console.log("create-nwsw project-id=" + projectId); // tODO del!!
        return projectId;
      })
      .subscribe();
  }

  save(): void {
    this.nwsw.creationDate = new Date();
    const user: User = this.userManagementService.getUser();
    this.nwsw.creationBy = user.email;
    this.nwsw.lastchangeBy = user.email;
    this.networkswitchingService.insertNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
      .then(() => this.goBack());
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.editForm.pristine || this.editForm.submitted) {
      return true;
    }

    return new Promise<boolean>(resolve => {
      return resolve(window.confirm('Move away from this site and lose all changes?'));
    });
  }

  goBack(): void {
    this.location.back();
  }
}

import {Log} from 'ng2-logger/ng2-logger'
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
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";


@Component({
  selector: 'create-network-switching',
  templateUrl: './create-network-switching.component.html',
  styleUrls: ['./create-network-switching.component.scss']
})
export class CreateNetworkSwitchingComponent implements OnInit {

  private log = Log.create('create-network-switching');

  nwsw: Networkswitching;

  // used by template:
  ZONES = Networkswitching.ZONES;
  // used by template:
  STATES = Networkswitching.STATES;
  // used by template:
  SYSTEM_ENVIRONMENTS = SYSTEM_ENVIRONMENTS.map(system => SystemEnvironment.text(system));

  private hostRegEx: String = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$";
  private ipRegEx: String = "^[0-9.-]+$";

  @ViewChild('createForm') public editForm: NgForm;

  constructor(
    private networkswitchingService: NetworkswitchingService,
    private userManagementService: UserManagementService,
    private dialogService: DialogService,
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
        this.log.i("create-nwsw project-id=", projectId);
        return [];
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
    return this.showConfirm();
  }


  /**
   * Show confirm dialog to ask user if he wants to go on and cancel changes.
   * See https://www.npmjs.com/package/ng2-bootstrap-modal
   * @returns {Observable<boolean>}
   */
  showConfirm(): Observable<boolean> {
    let disposable = this.dialogService.addDialog(ConfirmDialogComponent, {
                                                    title: 'Confirm dialog',
                                                    message: 'Move away from this site and lose all changes?'
                                                  });
    return disposable as any as Observable<boolean>;
  }


  goBack(): void {
    this.location.back();
  }
}

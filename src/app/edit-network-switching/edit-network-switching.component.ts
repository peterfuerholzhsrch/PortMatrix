import {Log} from 'ng2-logger/ng2-logger'
import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Networkswitching} from "../model/networkswitching";
import {Params, ActivatedRoute} from "@angular/router";
import {NetworkswitchingService} from '../networkswitching.service';
import {UserManagementService} from "../user-management.service";
import {SystemEnvironment, SYSTEM_ENVIRONMENTS} from '../model/systemEnvironment';
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'edit-network-switching',
  templateUrl: 'edit-network-switching.component.html',
  styleUrls: ['edit-network-switching.component.scss']
})
export class EditNetworkSwitchingComponent implements OnInit{

  private log = Log.create('edit-network-switching');

  private nwsw: Networkswitching;
  public testresultTimestampStr: string;
  @ViewChild('editForm') public editForm: NgForm;

  // Used by template:
  DATE_FORMAT = 'dd. MMMM yyyy, HH:mm:ss';
  ZONES = Networkswitching.ZONES;
  // used by template:
  STATES = Networkswitching.STATES;
  // used by template:
  SYSTEM_ENVIRONMENTS = SYSTEM_ENVIRONMENTS.map(system => SystemEnvironment.text(system));

  public hostRegEx: string = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$";
  public ipRegEx: string = "^[0-9.-]+$";


  constructor(
    private networkswitchingService: NetworkswitchingService,
    private userManagementService: UserManagementService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        const projectId = params['projectId'];
        this.userManagementService.setProjectId(projectId);
        this.log.i("edit-nwsw project-id=", projectId);
        return this.networkswitchingService.getNetworkswitching(projectId, params['id'])
      })
      .subscribe(nwsw => this.nwsw = nwsw);

    let date = new Date();
    date.setSeconds(0, 0);
    this.testresultTimestampStr = date.toJSON(); // format: (example) '2014-01-02T11:42:13.510';
    this.testresultTimestampStr = this.testresultTimestampStr.substr(0, this.testresultTimestampStr.length-2);
  }


  /**
   * Saves network switching
   * @param goBack true: goes back in browsing history
   */
  save(goBack: boolean): void {
    this.nwsw.lastchangeDate = new Date();
    this.nwsw.lastchangeBy = this.userManagementService.getUser().email;
    this.networkswitchingService.updateNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
      .then(() => {
        if (goBack) {
          this.goBack();
        }
      });
  }


  delete(): void {
    this.showConfirm('Confirm dialog', 'Are you sure to delete this network switching?')
      .subscribe(ok => {
        if (ok) {
          this.networkswitchingService.deleteNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
            .then(() => this.goBack());
        }
      });
  }


  addTestresult(success: boolean) {
    if (this.testresultTimestampStr) {
      const testresultTimestamp = new Date(Date.parse(this.testresultTimestampStr));
      this.log.i("addTestresult success=", success, " timestamp=", testresultTimestamp);

      this.nwsw.addTestresult(success, testresultTimestamp);
      this.save(false);
    }
  }


  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.editForm.pristine || this.editForm.submitted) {
      return true;
    }
    return this.showConfirm('Confirm dialog', 'Move away from this site and lose all changes?');
  }


  /**
   * Show confirm dialog to ask user if he wants to go on and cancel changes.
   * See https://www.npmjs.com/package/ng2-bootstrap-modal
   * @param title text shown in title bar
   * @param message text shown in the body
   * @returns {Observable<boolean>}
   */
  showConfirm(title: string, message: string): Observable<boolean> {
    let disposable = this.dialogService.addDialog(ConfirmDialogComponent, {
                                                    title: title,
                                                    message: message
                                                  });
    return disposable as any as Observable<boolean>;
  }


  goBack(): void {
    this.location.back();
  }
}

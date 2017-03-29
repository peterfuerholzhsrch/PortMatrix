import {Log} from "ng2-logger/ng2-logger";
import {Component, OnInit, ViewChild} from "@angular/core";
import {Params, ActivatedRoute, Router, CanDeactivate} from "@angular/router";
import {NetworkswitchingService} from "../networkswitching.service";
import {UserManagementService} from "../user-management.service";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {AbstractNetworkSwitchingComponent} from "../abstract-network-switching.component";


/**
 * This component handles editing a network switching.
 */
@Component({
  selector: 'edit-network-switching',
  templateUrl: 'edit-network-switching.component.html',
  styleUrls: ['edit-network-switching.component.scss']
})
export class EditNetworkSwitchingComponent extends AbstractNetworkSwitchingComponent implements OnInit, CanDeactivate<boolean> {

  private log = Log.create('edit-network-switching');

  testresultTimestampStr: string;
  @ViewChild('editForm') editForm: NgForm;

  static PROTOCOL_SETTINGS_HELP_MESSAGE = "You can select multiple protocols by pressing the Control key."

  // Used by template:
  DATE_FORMAT = 'dd. MMMM yyyy, HH:mm:ss';


  /**
   * @param networkswitchingService injected service
   * @param userManagementService injected service
   * @param dialogService injected service
   * @param route injected current route
   * @param router injected router
   */
  constructor(networkswitchingService: NetworkswitchingService,
              userManagementService: UserManagementService,
              dialogService: DialogService,
              route: ActivatedRoute,
              router: Router) {
    super(networkswitchingService, userManagementService, dialogService, route, router);
  }


  /**
   * NG2 lifecycle hook
   */
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        const projectId = params['projectId'];
        this.userManagementService.setProjectId(projectId).catch(err => this.setErrormessage(err));
        this.log.i("edit-nwsw project-id=", projectId);
        return this.networkswitchingService.getNetworkswitching(projectId, params['id'])
      })
      .subscribe(nwsw => this.nwsw = nwsw,
                 err => this.setErrormessage(err));

    let date = new Date();
    date.setSeconds(0, 0);
    this.testresultTimestampStr = date.toJSON(); // format: (example) '2014-01-02T11:42:13.510';
    this.testresultTimestampStr = this.testresultTimestampStr.substr(0, this.testresultTimestampStr.length-2);
  }


  /**
   * NG2 router hook.
   * @returns {any}
   */
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if nwsw could not be shown 'this.editForm' is <undefined>:
    if (!this.editForm || this.editForm.pristine || this.editForm.submitted) {
      return true;
    }
    return this.showConfirm('Confirm dialog', 'Move away from this site and lose all changes?');
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
      })
      .catch(error => this.setErrormessage(error));
  }


  /**
   * Deletes current network switching
   */
  delete(): void {
    this.showConfirm('Confirm dialog', 'Are you sure to delete this network switching?')
      .subscribe(ok => {
        if (ok) {
          this.networkswitchingService.deleteNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
            .then(() => this.goBack())
            .catch(error => this.setErrormessage(error));
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
}

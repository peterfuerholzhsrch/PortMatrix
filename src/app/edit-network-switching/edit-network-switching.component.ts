import {Log} from 'ng2-logger/ng2-logger';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Params, ActivatedRoute, Router, CanDeactivate} from '@angular/router';
import {NetworkswitchingService} from '../networkswitching.service';
import {UserManagementService} from '../user-management.service';
import {Observable, Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {AbstractNetworkSwitchingComponent} from '../abstract-network-switching.component';


/**
 * This component handles editing a network switching.
 */
@Component({
  selector: 'edit-network-switching',
  templateUrl: 'edit-network-switching.component.html',
  styleUrls: ['edit-network-switching.component.scss']
})
export class EditNetworkSwitchingComponent extends AbstractNetworkSwitchingComponent implements OnInit, CanDeactivate<boolean>, OnDestroy {

  private log = Log.create('edit-network-switching');

  testresultTimestampStr: string;
  @ViewChild('editForm') editForm: NgForm;

  private confirmSubscription: Subscription;

  static PROTOCOL_SETTINGS_HELP_MESSAGE = 'You can select multiple protocols by pressing the Control key.'

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
        this.log.i('edit-nwsw project-id=', projectId);
        return this.networkswitchingService.getNetworkswitching(projectId, params['id'])
      })
      .subscribe(nwsw => this.nwsw = nwsw,
        err => this.setErrormessage(err));

    this.initTestresultTimestamp();
  }


  /**
   * lifecycle hook
   */
  ngOnDestroy() {
    // unsubscribing from router not needed: https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
    if (this.confirmSubscription) {
      this.confirmSubscription.unsubscribe();
    }
  }


  private initTestresultTimestamp() {
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
  saveNwsw(goBack: boolean): void {
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
  deleteNwsw(): void {
    this.confirmSubscription = this.showConfirm('Confirm dialog', 'Are you sure to delete this network switching?')
      .subscribe(ok => {
        if (ok) {
          this.networkswitchingService.deleteNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
            .then(() => this.goBack())
            .catch(error => this.setErrormessage(error));
        }
      });
  }


  /**
   * @param presumableDateString
   * @return valid Date or null
   */
  private static evaluateDate(presumableDateString: string): Date {
    if (!presumableDateString) {
      return null; // otherwise 1.1.1970 is returned
    }
    // try to convert to date (see http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript):
    const presumableDate = new Date(presumableDateString);
    if (Object.prototype.toString.call(presumableDate) === '[object Date]') {
      // it is a date
      if (!isNaN(presumableDate.getTime())) {
        return presumableDate;
      }
    }
    return null;
  }


  addTestresult(success: boolean) {
    this.errormessage = null;

    const timestamp: Date = EditNetworkSwitchingComponent.evaluateDate(this.testresultTimestampStr);
    if (timestamp) {
      this.log.i('addTestresult success=', success, ' timestamp=', timestamp);

      this.nwsw.addTestresult(success, timestamp);
      this.saveNwsw(false);
    }
    else {
      this.errormessage = 'Adding test result failed: The entered date string is invalid!';
      this.initTestresultTimestamp();
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

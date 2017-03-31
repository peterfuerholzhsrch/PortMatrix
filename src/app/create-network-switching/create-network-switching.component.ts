import {Log} from 'ng2-logger/ng2-logger';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Networkswitching} from '../model/networkswitching';
import {Params, ActivatedRoute, Router, CanDeactivate} from '@angular/router';
import {NetworkswitchingService} from '../networkswitching.service';
import {Endpoint} from '../model/endpoint';
import {User} from '../model/user';
import {UserManagementService} from '../user-management.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {AbstractNetworkSwitchingComponent} from '../abstract-network-switching.component';


/**
 * This component handles creating a network switching.
 */
@Component({
  selector: 'create-network-switching',
  templateUrl: './create-network-switching.component.html',
  styleUrls: ['./create-network-switching.component.scss']
})
export class CreateNetworkSwitchingComponent extends AbstractNetworkSwitchingComponent implements OnInit, CanDeactivate<boolean>, OnDestroy {

  private log = Log.create('create-network-switching');

  @ViewChild('createForm') editForm: NgForm;


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
   * lifecycle hook
   */
  ngOnInit(): void {
    this.nwsw = new Networkswitching();
    this.nwsw.source = new Endpoint();
    this.nwsw.destination = new Endpoint();
    this.route.params
      .switchMap((params: Params) => {
        const projectId = params['projectId'];
        this.userManagementService.setProjectId(projectId).catch(err => this.setErrormessage(err));
        this.log.i('create-nwsw project-id=', projectId);
        return [];
      })
      .subscribe(ok => {}, err => this.setErrormessage(err) );
  }


  /**
   * lifecycle hook
   */
  ngOnDestroy() {
    // unsubscribing from router not needed: https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
  }


  /**
   * NG2 router hook
   * @returns {any}
   */
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if nwsw could not be shown 'this.editForm' is <undefined>:
    if (!this.editForm || this.editForm.pristine || this.editForm.submitted) {
      return true;
    }
    return this.showConfirm();
  }


  /**
   * Saves network switching.
   */
  save(): void {
    this.nwsw.creationDate = new Date();
    const user: User = this.userManagementService.getUser();
    this.nwsw.creationBy = user.email;
    this.nwsw.lastchangeBy = user.email;
    this.networkswitchingService.insertNetworkswitching(this.userManagementService.getProjectId(), this.nwsw)
      .then(() => this.goBack())
      .catch(error => this.setErrormessage(error));
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
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule}     from './app-routing.module';
import './rxjs-extensions';
import {Log, Level} from 'ng2-logger/ng2-logger'
import {AlertModule} from 'ng2-bootstrap';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';

import {MainComponent} from './main/main.component';
import {NetworkswitchingsBrowserComponent} from "./network-switchings-browser/network-switchings-browser.component";
import {NetworkswitchingService} from "./networkswitching.service";
import {EditNetworkSwitchingComponent} from './edit-network-switching/edit-network-switching.component';

import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {SortIndicator} from './sort-indicator/sort-indicator.component';
import {SortButtonComponent} from './sort-button/sort-button.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {UserManagementService} from "./user-management.service";
import {ProjectService} from "./project.service";
import {CommonRestService} from "./common-rest.service";
import {CreateNetworkSwitchingComponent} from './create-network-switching/create-network-switching.component';
import {AuthGuardService} from "./auth-guard.service";
import {SessionStorageService} from "./session-storage.service";
import {MultiEmailDirective} from './multi-email.directive';
import {MultiEmailFormComponent} from './multi-email-form/multi-email-form.component';
import {SharedModule} from "./shared/shared.module";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {TestStatusComponent} from "./test-status/test-status.component";
import { PrePostfixPipe } from './pre-postfix.pipe';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

// TODO Enable for production!!!
// Log.setProductionMode();


/**
 * The PortMatrix application consists of one module only. Here is where it is defined.
 */
@NgModule({
  declarations: [
    MainComponent,
    NetworkswitchingsBrowserComponent,
    EditNetworkSwitchingComponent,
    SortIndicator,
    SortButtonComponent,
    CreateNetworkSwitchingComponent,
    SortButtonComponent,
    TestStatusComponent,
    UserManagementComponent,
    MultiEmailDirective,
    MultiEmailFormComponent,
    ConfirmDialogComponent,
    PrePostfixPipe,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
    AppRoutingModule,
    AlertModule,
    SharedModule,
    BootstrapModalModule
  ],
  providers: [CommonRestService,
    NetworkswitchingService,
    UserManagementService,
    ProjectService,
    AuthGuardService,
    SessionStorageService
  ],
  entryComponents: [
    ConfirmDialogComponent, // see https://www.npmjs.com/package/ng2-bootstrap-modal
    AlertDialogComponent
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}

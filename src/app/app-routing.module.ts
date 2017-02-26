/**
 * Created by pfu on 17/11/16.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NetworkswitchingsBrowserComponent}   from './network-switchings-browser/network-switchings-browser.component';
import {EditNetworkSwitchingComponent} from "./edit-network-switching/edit-network-switching.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {CreateNetworkSwitchingComponent} from "./create-network-switching/create-network-switching.component";
import {AuthGuardService} from "./auth-guard.service";
import {CanDeactivateGuard} from "./shared/can-deactivate-guard.service";

const routes: Routes = [
  {path: '', redirectTo: '/user', pathMatch: 'full'},
  {path: 'user', component: UserManagementComponent},
  {path: 'nwsw/:projectId', component: NetworkswitchingsBrowserComponent, canActivate: [AuthGuardService]},
  {path: 'detail/:projectId/:id', component: EditNetworkSwitchingComponent, canActivate: [AuthGuardService], canDeactivate:[CanDeactivateGuard]},
  {path: 'create/:projectId', component: CreateNetworkSwitchingComponent, canActivate: [AuthGuardService], canDeactivate:[CanDeactivateGuard]},
  // forward to login if no path matches:
  {path: '**', redirectTo: '/user'} // found under http://stackoverflow.com/questions/36260839/angular-2-how-to-redirect-to-404-or-other-path-if-the-path-does-not-exist
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

/**
 * Created by pfu on 17/11/16.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NetworkswitchingsBrowserComponent}   from './network-switchings-browser/network-switchings-browser.component';
import {EditNetworkSwitchingComponent} from "./edit-network-switching/edit-network-switching.component";
import {UserManagementComponent} from "./user-management/user-management.component";

const routes: Routes = [
  {path: '', redirectTo: '/nwsw', pathMatch: 'full'},
  {path: 'nwsw', component: NetworkswitchingsBrowserComponent},
  {path: 'detail/:id', component: EditNetworkSwitchingComponent},
  {path: 'user', component: UserManagementComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

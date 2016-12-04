/**
 * Created by pfu on 17/11/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkswitchingsComponent }   from './networkswitchings.component';
import {AppComponent} from "./app.component";

const routes: Routes = [
    { path: '', redirectTo: '/nwsw', pathMatch: 'full' },
//    { path: 'dashboard',  component: AppComponent },
    { path: 'nwsw',  component: NetworkswitchingsComponent },
//    { path: 'detail/:id', component: HeroDetailComponent },
//    { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

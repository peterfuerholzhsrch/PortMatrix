import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { NetworkswitchingsComponent } from "./networkswitchings.component";

import './rxjs-extensions';
import {NetworkswitchingService} from "./networkswitching.service";
import { EditNetworkSwitchingComponent } from './edit-network-switching/edit-network-switching.component';

import {InfiniteScrollModule} from "angular2-infinite-scroll";
import { SortIndicator } from './sort-indicator/sort-indicator.component';
import { SortButtonComponent } from './sort-button/sort-button.component';


@NgModule({
  declarations: [
    AppComponent,
    NetworkswitchingsComponent,
    EditNetworkSwitchingComponent,
    SortIndicator,
    SortButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
    AppRoutingModule,
    AlertModule
  ],
  providers: [ NetworkswitchingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

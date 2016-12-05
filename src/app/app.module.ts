import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { NetworkswitchingsComponent } from "./networkswitchings.component";

import './rxjs-extensions';
import {NetworkswitchingService} from "./networkswitching.service";



@NgModule({
  declarations: [
    AppComponent,
    NetworkswitchingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    AlertModule
  ],
  providers: [ NetworkswitchingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

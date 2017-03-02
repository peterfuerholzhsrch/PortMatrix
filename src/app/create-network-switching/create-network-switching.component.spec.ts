/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By, BrowserModule} from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {CreateNetworkSwitchingComponent} from './create-network-switching.component';
import {MainComponent} from "../main/main.component";
import {NetworkswitchingsBrowserComponent} from "../network-switchings-browser/network-switchings-browser.component";
import {SortIndicator} from "../sort-indicator/sort-indicator.component";
import {SortButtonComponent} from "../sort-button/sort-button.component";
import {UserManagementComponent} from "../user-management/user-management.component";
import {EditNetworkSwitchingComponent} from "../edit-network-switching/edit-network-switching.component";
import {MultiEmailDirective} from "../multi-email.directive";
import {MultiEmailFormComponent} from "../multi-email-form/multi-email-form.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {AppRoutingModule} from "../app-routing.module";
import {AlertModule} from "ng2-bootstrap";
import {SharedModule} from "../shared/shared.module";
import {BootstrapModalModule} from "ng2-bootstrap-modal";
import {CommonRestService} from "../common-rest.service";
import {NetworkswitchingService} from "../networkswitching.service";
import {UserManagementService} from "../user-management.service";
import {ProjectService} from "../project.service";
import {AuthGuardService} from "../auth-guard.service";
import {SessionStorageService} from "../session-storage.service";
import {APP_BASE_HREF} from "@angular/common";

describe('CreateNetworkSwitching', () => {
  let component: CreateNetworkSwitchingComponent;
  let fixture: ComponentFixture<CreateNetworkSwitchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        NetworkswitchingsBrowserComponent,
        CreateNetworkSwitchingComponent,
        SortIndicator,
        SortButtonComponent,
        EditNetworkSwitchingComponent,
        SortButtonComponent,
        UserManagementComponent,
        MultiEmailDirective,
        MultiEmailFormComponent,
        ConfirmDialogComponent
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
        SessionStorageService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNetworkSwitchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

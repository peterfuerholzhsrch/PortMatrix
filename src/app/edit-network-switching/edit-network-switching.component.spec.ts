/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By, BrowserModule} from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {EditNetworkSwitchingComponent} from './edit-network-switching.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AlertModule} from "ng2-bootstrap";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "../app-routing.module";
import {CommonRestService} from "../common-rest.service";
import {NetworkswitchingService} from "../networkswitching.service";
import {UserManagementService} from "../user-management.service";
import {ProjectService} from "../project.service";
import {AuthGuardService} from "../auth-guard.service";
import {SessionStorageService} from "../session-storage.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MultiEmailFormComponent} from "../multi-email-form/multi-email-form.component";
import {UserManagementComponent} from "../user-management/user-management.component";
import {SortButtonComponent} from "../sort-button/sort-button.component";
import {CreateNetworkSwitchingComponent} from "../create-network-switching/create-network-switching.component";
import {SortIndicator} from "../sort-indicator/sort-indicator.component";
import {NetworkswitchingsBrowserComponent} from "../network-switchings-browser/network-switchings-browser.component";
import {MainComponent} from "../main/main.component";
import {MultiEmailDirective} from "../multi-email.directive";

describe('editNetworkSwitching', () => {
  let component: EditNetworkSwitchingComponent;
  let fixture: ComponentFixture<EditNetworkSwitchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        NetworkswitchingsBrowserComponent,
        EditNetworkSwitchingComponent,
        SortIndicator,
        SortButtonComponent,
        CreateNetworkSwitchingComponent,
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
        SharedModule
      ],
      providers: [CommonRestService,
        NetworkswitchingService,
        UserManagementService,
        ProjectService,
        AuthGuardService,
        SessionStorageService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNetworkSwitchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('HostRegex', () => {
  let component: EditNetworkSwitchingComponent;

  it('should accept one hostaddress', () => {
    expect("test@test.ch").toMatch(component.hostRegEx);
  });

  it('should accept multiple hostaddress', () => {
    expect("test@test.ch, test2@test2.com").toMatch(component.hostRegEx);
  });

  it('should accept multiple hostaddress', () => {
    expect("test@test.ch, test2@test2.com").toMatch(component.hostRegEx);
  });

  it('should not accept missing Top-Level-Domain', () => {
    expect("test@test").not.toMatch(component.hostRegEx);
  });

  it('should not accept wrong hostaddress', () => {
    expect("test").not.toMatch(component.hostRegEx);
  });

  it('should not accept one wrong out of multiple hostaddresses', () => {
    expect("test test@test.ch").not.toMatch(component.hostRegEx);
  });
});

import {Log} from 'ng2-logger/ng2-logger'
import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";

import {Networkswitching} from '../model/networkswitching';
import {NetworkswitchingService} from '../networkswitching.service';
import {Sorting} from '../model/Sorting';
import {Subject} from "rxjs";
import {CommonRestService} from "../common-rest.service";
import {UserManagementService} from "../user-management.service";


@Component({
  selector: 'network-switchings-browser',
  templateUrl: "network-switchings-browser.component.html",
  styleUrls: ['./network-switchings-browser.component.scss'],
})
export class NetworkswitchingsBrowserComponent implements OnInit {
  private log = Log.create('network-switching-browser');

  private searchTermObservable = new Subject<string>();
  private searchTerm: string = "";

  private static LIMIT: number = 10;

  offset: number = 0;
  private lastRequestedOffset = null;

  // AngularJS2's HTML templates can access component class instance only. So we have to provide the Sorting's constants
  // as instance members (see http://stackoverflow.com/questions/39193538/how-to-bind-static-variable-of-component-in-html-in-angular-2):
  public SortingID = Sorting.ID;
  public SortingSTATE = Sorting.STATE;
  public SortingUSER = Sorting.CREATION_BY;
  public SortingTEST_STATE = Sorting.TEST_STATE;
  public SortingSOURCE_ZONE = Sorting.SOURCE_ZONE;
  public SortingSOURCE_GROUP = Sorting.SOURCE_GROUP;
  public SortingSOURCE_HOST = Sorting.SOURCE_HOST;
  public SortingSOURCE_IP = Sorting.SOURCE_IP;
  public SortingDESTINATION_ZONE = Sorting.DESTINATION_ZONE;
  public SortingDESTINATION_GROUP = Sorting.DESTINATION_GROUP;
  public SortingDESTINATION_HOST = Sorting.DESTINATION_HOST;
  public SortingDESTINATION_IP = Sorting.DESTINATION_IP;
  public SortingDESTINATION_PORT = Sorting.DESTINATION_PORT;

  networkswitchings: Networkswitching[] = [];

  private errormessage: string;
  private isLoading: boolean;
  private mobileView: boolean;
  private viewBreakpoint: number = 1200;

  /**
   * @param networkswitchingService
   * @param userManagementService
   * @param route
   * @param router
   */
  constructor(private networkswitchingService: NetworkswitchingService,
              private userManagementService: UserManagementService,
              private route: ActivatedRoute,
              private router: Router) {
    window.screen.width < this.viewBreakpoint ? this.setNetworkswitchView(true) : this.setNetworkswitchView(false);
  }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        const projectId = params['projectId'];
        this.userManagementService.setProjectId(projectId).catch(err => this.setErrormessage(err));
        this.log.i("project-id=", projectId);
        return this.loadNwsw()
      })
      .subscribe(nwsws => this.networkswitchings = nwsws,
                 err => this.setErrormessage(err));

    // execute search when user entered a new value and after last keyup of 500ms:
    this.searchTermObservable
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((searchTerm) => { this.reloadNwsw() });
  }


  private setErrormessage(error) {
    this.errormessage = error.message || error;
  }


  public getProjectId() {
    return this.userManagementService.getProjectId();
  }


  /**
   * Resets current sort settings
   */
  public resetSorting() {
    this.userManagementService.clearSorting();
    this.reloadNwsw();
  }


  public getSortingList() {
    return this.userManagementService.getSortingList();
  }


  public sortingChanged() {
    this.reloadNwsw();
  }


  onScrollDown() {
    this.log.d("scrolled down");
    this.loadNwsw();
  }

  onScrollUp() {
    this.log.d("scrolled up");
  }

  insert() {
    this.router.navigate(['./create', this.userManagementService.getProjectId()]);
  }


  onResize() {
    window.screen.width < this.viewBreakpoint ? this.setNetworkswitchView(true) : this.setNetworkswitchView(false);
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchTermObservable.next(this.searchTerm);
  }

  public setNetworkswitchView (mobileViewEnabled: boolean) {
    this.mobileView = mobileViewEnabled;
  }


  private reloadNwsw() {
    this.networkswitchings.splice(0, this.networkswitchings.length); // clear array
    this.lastRequestedOffset = null;
    this.loadNwsw();
  }

  // TODO move to Service class ???
  private loadNwsw(): Promise<Array<Networkswitching>> {
    this.isLoading = true;
    this.offset = this.networkswitchings.length;
    if (this.offset === this.lastRequestedOffset) {
      return Promise.resolve(this.networkswitchings); // already loaded, don't load again...
    }
    this.lastRequestedOffset = this.offset;
    const sortingList = this.userManagementService.getSortingList();
    return this.networkswitchingService.getNetworkswitchings(this.userManagementService.getProjectId(),
                                                             this.searchTerm,
                                                             sortingList,
                                                             this.offset,
                                                             NetworkswitchingsBrowserComponent.LIMIT)
      .then(nwsws => {
        this.log.i(`offset=${this.offset}, sorting=${JSON.stringify(sortingList)}`);
        this.networkswitchings.push(...nwsws);
        this.isLoading = false;
        return this.networkswitchings;
      })
      .catch(CommonRestService.handleError)
  }
}

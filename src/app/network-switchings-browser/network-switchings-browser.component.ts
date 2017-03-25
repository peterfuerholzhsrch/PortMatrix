import {Log} from 'ng2-logger/ng2-logger'
import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";

import {Networkswitching} from '../model/networkswitching';
import {NetworkswitchingService} from '../networkswitching.service';
import {Sorting} from '../model/sorting';
import {Subject, Observable} from "rxjs";
import {CommonRestService} from "../common-rest.service";
import {UserManagementService} from "../user-management.service";
import {DialogService} from "ng2-bootstrap-modal";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {SessionStorageService} from "../session-storage.service";

@Component({
  selector: 'network-switchings-browser',
  templateUrl: "network-switchings-browser.component.html",
  styleUrls: ['./network-switchings-browser.component.scss'],
})
export class NetworkswitchingsBrowserComponent implements OnInit {
  private log = Log.create('network-switching-browser');

  private searchTermObservable = new Subject<string>();
  private searchTerm: string = "";

  private sortingList: Array<Sorting> = [];

  offset: number = 0;
  private lastRequestedOffset = null;

  // AngularJS2's HTML templates can access component class instance only. So we have to provide the Sorting's constants
  // as instance members (see http://stackoverflow.com/questions/39193538/how-to-bind-static-variable-of-component-in-html-in-angular-2):
  SortingID = Sorting.ID;
  SortingSTATE = Sorting.STATE;
  SortingUSER = Sorting.CREATION_BY;
  SortingTEST_STATE = Sorting.TEST_STATE;
  SortingSOURCE_ZONE = Sorting.SOURCE_ZONE;
  SortingSOURCE_GROUP = Sorting.SOURCE_GROUP;
  SortingSOURCE_HOST = Sorting.SOURCE_HOST;
  SortingSOURCE_IP = Sorting.SOURCE_IP;
  SortingDESTINATION_ZONE = Sorting.DESTINATION_ZONE;
  SortingDESTINATION_GROUP = Sorting.DESTINATION_GROUP;
  SortingDESTINATION_HOST = Sorting.DESTINATION_HOST;
  SortingDESTINATION_IP = Sorting.DESTINATION_IP;
  SortingDESTINATION_PORT = Sorting.DESTINATION_PORT;

  networkswitchings: Networkswitching[] = [];

  private errormessage: string;
  private isLoading: boolean;
  private mobileView: boolean;
  private viewBreakpoint: number = 1000;

  private SEARCH_FILTER_HELP_MESSAGE = `Entered words are looked up on all fields of a network switching. Only network switchings matching 
all words are returned. Following rules apply: <br>
<ul>
<li>the search in case-insensitive</li>
<li>use <code>true</code> / <code>false</code> for boolean values (for successful / failed test results)</li>
<li>use <code>&lt;year&gt;-&lt;month&gt;-&lt;day&gt;</code> for filtering on dates (creation date, updated date, test 
timestamp), e.g <code>2017-03-12</code></li>
</ul>`;


  /**
   * @param networkswitchingService
   * @param userManagementService
   * @param sessionStorageService
   * @param route
   * @param router
   */
  constructor(private networkswitchingService: NetworkswitchingService,
              private userManagementService: UserManagementService,
              private dialogService: DialogService,
              private sessionStorageService: SessionStorageService,
              private route: ActivatedRoute,
              private router: Router) {
    window.innerWidth < this.viewBreakpoint ? this.setNetworkswitchView(true) : this.setNetworkswitchView(false);
  }


  ngOnInit(): void {
    this.searchTerm = this.sessionStorageService.getSearchTerm();
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
      .subscribe(searchTerm => {
        // save searchTerm to survive page reload:
        this.sessionStorageService.setSearchTerm(searchTerm);
        this.reloadNwsw()
      });
  }

  ngAfterViewInit() {
    this.sortingList = this.sessionStorageService.getSortingList();
    return true;
  }


  private setErrormessage(error) {
    this.errormessage = error.message || error;
  }


  getProjectId() {
    return this.userManagementService.getProjectId();
  }


  /**
   * Resets current sort settings
   */
  resetSorting() {
    this.sortingList = [];
    this.sessionStorageService.setSortingList(this.sortingList);
    this.reloadNwsw();
  }


  getSortingList() {
    return this.sortingList;
  }

  sortingChanged() {
    this.sessionStorageService.setSortingList(this.sortingList)
    this.reloadNwsw();
  }


  onScrollDown() {
    this.log.d("scrolled down");
    this.loadNwsw();
  }

  onScrollUp() {
    this.log.d("scrolled up");
    this.loadNwsw();
  }

  insert() {
    this.router.navigate(['./create', this.userManagementService.getProjectId()]);
  }


  onResize() {
    window.innerWidth < this.viewBreakpoint ? this.setNetworkswitchView(true) : this.setNetworkswitchView(false);
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchTermObservable.next(this.searchTerm);
  }

  setNetworkswitchView (mobileViewEnabled: boolean) {
    this.mobileView = mobileViewEnabled;
  }


  showInfoOnFilter() {
    this.dialogService.addDialog(AlertDialogComponent,
      { title: "Filtering",
        message: this.SEARCH_FILTER_HELP_MESSAGE },
      { closeByClickingOutside: true });
  }


  showInfoOnSort() {
    const message = `You can sort on multiple columns by pressing the column names shown next here. Click the 
column with first precedence first then with second precedence second (and so on). If you a column a second time 
it is changing from ascending to descending (and vice versa). To start over click the 'Reset Sorting' button.`;

    this.dialogService.addDialog(AlertDialogComponent,
                                { title: "Sorting",
                                  message: message },
                                { closeByClickingOutside: true });
  }


  private getNumberOfNwswsToLoad() {
    // in the mobileView 15 items is enough to load to fill a big screen as well:
    return this.mobileView ? 15 : 30;
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
    const sortingList = this.sessionStorageService.getSortingList();
    return this.networkswitchingService.getNetworkswitchings(this.userManagementService.getProjectId(),
                                                             this.searchTerm,
                                                             sortingList,
                                                             this.offset,
                                                             this.getNumberOfNwswsToLoad())
      .then(nwsws => {
        this.log.i(`offset=${this.offset}, sorting=${JSON.stringify(sortingList)}`);
        this.networkswitchings.push(...nwsws);
        this.isLoading = false;
        return this.networkswitchings;
      })
      .catch(CommonRestService.handleError)
  }
}

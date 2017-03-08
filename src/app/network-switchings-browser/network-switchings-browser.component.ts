import {Log} from 'ng2-logger/ng2-logger'
import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";

import {Networkswitching} from '../model/networkswitching';
import {NetworkswitchingService} from '../networkswitching.service';
import {Sorting} from '../model/Sorting';
import {Observable, Subject} from "rxjs";
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

  private sortingList: Array<Sorting> = [];


  /**
   * @param networkswitchingService
   * @param route
   * @param router
   */
  constructor(private networkswitchingService: NetworkswitchingService,
              private userManagementService: UserManagementService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => {
        const projectId = params['projectId'];
        this.userManagementService.setProjectId(projectId);
        this.log.i("project-id=", projectId);
        return this.loadNwsw()
      })
      .subscribe(nwsws => this.networkswitchings = nwsws);

    // execute search when user entered a new value and after last keyup of 500ms:
    this.searchTermObservable
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((searchTerm) => { this.reloadNwsw() });
  }


  public getProjectId() {
    return this.userManagementService.getProjectId();
  }


  /**
   * Resets current sort settings
   */
  public resetSorting() {
    this.sortingList = [];
    this.reloadNwsw();
  }

  /**
   * To be called by a sorting button
   * @param sortButton
   */
  public sortingButtonClicked(sortButton : string) {
    const sorting = this.getSorting(sortButton);
    if (sorting) {
      sorting.ascending = !sorting.ascending;
    }
    else {
      const addSorting = Sorting.getSortingByDbColumn(sortButton);
      this.sortingList.push(addSorting);
    }
    this.reloadNwsw();
  }

  public isAscending(sortButton: string): Boolean {
    const sorting = this.getSorting(sortButton);
    return sorting ? sorting.ascending : null;
  }

  public getOrder(sortButton: string): Number {
    const sorting = Sorting.getSortingByDbColumn(sortButton);
    const sortIndex = this.sortingList.indexOf(sorting);
    return sortIndex >= 0 ? sortIndex : null;
  }

  private getSorting(sortButton: string): Sorting {
    const sorting = Sorting.getSortingByDbColumn(sortButton);
    const sortIndex = this.sortingList.indexOf(sorting);
    if (sortIndex >= 0) {
      return sorting;
    }
    return null;
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

  public sortOrderChanged(sortingColumn) {
    this.log.i("new sorting: ", sortingColumn.dbColumn);
    this.reloadNwsw();
  }


  public search(searchTerm: string): void {
    this.searchTerm = "'" + searchTerm + "'"; // "'" -> use 'string' search);
    this.searchTermObservable.next(this.searchTerm);
  }


  private reloadNwsw() {
    this.networkswitchings.splice(0, this.networkswitchings.length); // clear array
    this.lastRequestedOffset = null;
    this.loadNwsw();
  }

  // TODO move to Service class ???
  private loadNwsw(): Promise<Array<Networkswitching>> {
    this.offset = this.networkswitchings.length;
    if (this.offset === this.lastRequestedOffset) {
      return Promise.resolve(this.networkswitchings); // already loaded, don't load again...
    }
    this.lastRequestedOffset = this.offset;
    return this.networkswitchingService.getNetworkswitchings(this.userManagementService.getProjectId(),
                                                             this.searchTerm,
                                                             this.sortingList,
                                                             this.offset,
                                                             NetworkswitchingsBrowserComponent.LIMIT)
      .then(nwsws => {
        this.log.i(`offset=${this.offset}, sorting=${JSON.stringify(this.sortingList)}`);
        this.networkswitchings.push(...nwsws);
        return this.networkswitchings;
      })
      .catch(this.userManagementService.handleError);
  }
}

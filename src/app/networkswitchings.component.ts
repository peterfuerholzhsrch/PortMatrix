import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Networkswitching} from './model/networkswitching';
import {NetworkswitchingService} from './networkswitching.service';
import {Sorting} from './model/Sorting';


@Component({
  selector: 'nwsw',
  templateUrl: "networkswitchings.component.html",
})
export class NetworkswitchingsComponent implements OnInit {

  private static LIMIT: number = 10;

  offset: number = 0;
  private lastRequestedOffset = null;


  networkswitchings: Networkswitching[] = [];
  private availableSortingColumns: Array<Sorting> = [
    new Sorting("ID", "id", true),
    new Sorting("State", "state", true),
    new Sorting("Source Group", "source.group", true),
    new Sorting("Destination Group", "destination.group", true)
  ];

  sortingColumn1: Sorting = this.availableSortingColumns[1];
  sortingColumn2: Sorting = this.availableSortingColumns[3];


  /**
   * @param networkswitchingService
   * @param router
   */
  constructor(private networkswitchingService: NetworkswitchingService, private router: Router) {
  }


  ngOnInit(): void {
    this.getNetworkswitchings();
  }

  getNetworkswitchings(): void {
    this.loadNwsw();
  }

  onScrollDown() {
    console.log("scrolled down");
    this.loadNwsw();
  }

  onScrollUp() {
    console.log("scrolled up");
  }

  public sortOrderChanged(sortingColumn) {
    console.log("new sorting: " + sortingColumn.dbColumn);
    this.reloadNwsw();
  }


  private reloadNwsw() {
    this.networkswitchings.splice(0, this.networkswitchings.length); // clear array
    this.lastRequestedOffset = null;
    this.loadNwsw();
  }


  private loadNwsw() {
    // build up sort order string:
    let sortings = [];
    sortings.push(this.sortingColumn1);
    sortings.push(this.sortingColumn2);

    this.offset = this.networkswitchings.length;
    if (this.offset === this.lastRequestedOffset) {
      return; // already loaded, don't load again...
    }
    this.lastRequestedOffset = this.offset;
    this.networkswitchingService.getNetworkswitchings(sortings, this.offset, NetworkswitchingsComponent.LIMIT).then(nwsws => {
      console.log(`offset=${this.offset}, nwsws=${JSON.stringify(nwsws)}`);
      this.networkswitchings.push(...nwsws)
    });
  }


  // onSelect(hero: Hero): void {
  //     this.selectedHero = hero;
  // }
  //
  // add(name: string): void {
  //     name = name.trim();
  //     if (!name) { return; }
  //     this.heroService.create(name)
  //         .then(hero => {
  //             this.heroes.push(hero);
  //             this.selectedHero = null;
  //         });
  // }
  //
  // gotoDetail(): void {
  //     this.router.navigate(['/detail', this.selectedHero.id]);
  // }
  //
  // delete(hero: Hero): void {
  //     this.heroService
  //         .delete(hero.id)
  //         .then(() => {
  //             this.heroes = this.heroes.filter(h => h !== hero);
  //             if (this.selectedHero === hero) { this.selectedHero = null; }
  //         });
  // }
}

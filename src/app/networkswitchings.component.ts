import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Networkswitching } from './model/networkswitching';
import { NetworkswitchingService } from './networkswitching.service';



@Component({
    selector: 'nwsw',
    templateUrl: "networkswitchings.component.html",
})
export class NetworkswitchingsComponent implements OnInit {
    constructor(private networkswitchingService: NetworkswitchingService, private router: Router) { }

    private static LIMIT: number = 10;

    offset: number = 0;
    private lastRequestedOffset = null;

    networkswitchings: Networkswitching[] = [];

    //selectedHero: Hero;

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


    private reloadNwsw() {
      this.networkswitchings.splice(0, this.networkswitchings.length); // clear array
      this.lastRequestedOffset = null;
      this.loadNwsw();
    }


    private loadNwsw() {
        this.offset = this.networkswitchings.length;
        if (this.offset === this.lastRequestedOffset) {
            return; // already loaded, don't load again...
        }
        this.lastRequestedOffset = this.offset;
        this.networkswitchingService.getNetworkswitchings(this.offset, NetworkswitchingsComponent.LIMIT).
          then(nwsws => {
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

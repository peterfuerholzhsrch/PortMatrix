import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Networkswitching } from './model/networkswitching';
import { NetworkswitchingService } from './networkswitching.service';

import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
    selector: 'nwsw',
    templateUrl: "networkswitchings.component.html",
})
export class NetworkswitchingsComponent implements OnInit {
    constructor(private networkswitchingService: NetworkswitchingService, private router: Router) { }

    private static LIMIT: number = 10;

    offset: number = 0;
    networkswitchings: Networkswitching[] = [];

    //selectedHero: Hero;

    ngOnInit(): void {
        this.getNetworkswitchings();
    }

    getNetworkswitchings(): void {
        this.networkswitchingService.getNetworkswitchings(this.offset, NetworkswitchingsComponent.LIMIT).
            then(nwsws => this.networkswitchings.push(...nwsws));
    }
    onScrollDown() {
      console.log("scrolled down");
      this.offset = this.networkswitchings.length;
      this.networkswitchingService.getNetworkswitchings(this.offset, NetworkswitchingsComponent.LIMIT).
          then(nwsws => {
              console.log("nwsws=" + nwsws);
              this.networkswitchings.push(...nwsws)
              console.log("this.networkswitchings.length=" + this.networkswitchings.length);
            });
    }

    onScrollUp() {
      console.log("scrolled up");
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

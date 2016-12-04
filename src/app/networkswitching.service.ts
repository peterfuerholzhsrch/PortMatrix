/**
 * Created by pfu on 15/11/16.
 */
import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Networkswitching } from './model/networkswitching';
// delete: import { HEROES } from './mock-heroes-delete';


@Injectable()
export class NetworkswitchingService {

    private networkswitchingUrl = 'app/nwsw';  // URL to web api

    constructor(private http: Http) { }

  getNetworkswitchings(): Promise<Networkswitching[]> {
        return this.http.get(this.networkswitchingUrl)
            .toPromise()
            .then(response => response.json().data as Networkswitching[])
            .catch(this.handleError);
    }

    // getHeroes(): Promise<Hero[]> {
    //     return Promise.resolve(HEROES);
    // }

    // // getHeroesSlowly
    // getHeroes(): Promise<Hero[]> {
    //     return new Promise<Hero[]>(resolve =>
    //         setTimeout(resolve, 500)) // delay 0.5 seconds
    //         .then(() => Promise.resolve(HEROES));
    // }

    getNetworkswitching(id: number): Promise<Networkswitching> {
        return this.getNetworkswitchings()
            .then(networkswitchings => networkswitchings.find(networkswitching => networkswitching.id === id));
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(hero: Networkswitching): Promise<Networkswitching> {
        const url = `${this.networkswitchingUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Networkswitching> {
        return this.http
            .post(this.networkswitchingUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.networkswitchingUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

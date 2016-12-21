/**
 * Created by pfu on 15/11/16.
 */
import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Networkswitching} from './model/networkswitching';
import {Sorting} from './model/Sorting';


@Injectable()
export class NetworkswitchingService {

  private networkswitchingUrl = 'api/nwsw';  // URL to web api

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) {
  }

  /**
   * @param sorting
   * @param offset where to start, 0 = from start
   * @param limit max number of records to return (via Promise)
   * @returns {any}
   */
  getNetworkswitchings(sorting: Sorting[], offset: number, limit: number): Promise<Networkswitching[]> {

    let sortingQuery = encodeURIComponent(sorting.map(sort => sort.toRestQuery()).join(','));

    return this.http.get(this.networkswitchingUrl + `?sort=${sortingQuery}&offset=${offset}&limit=${limit}`)
      .toPromise()
      .then(response => {
        let nwsws: Networkswitching[] = response.json().data as Networkswitching[];
        return nwsws;
      })
      .catch(this.handleError);
  }


  getNetworkswitching(id: string): Promise<Networkswitching> {
    return this.http.get(this.networkswitchingUrl + "/" + id)
      .toPromise()
      .then(response => {
        let nwsw: Networkswitching = response.json() as Networkswitching;
        return nwsw;
      })
      .catch(this.handleError);
  }


  update(networkswitching: Networkswitching): Promise<Networkswitching> {
    const url = `${this.networkswitchingUrl}/${networkswitching.id}`;
    return this.http
      .put(url, JSON.stringify(networkswitching), {headers: this.headers})
      .toPromise()
      .then(() => networkswitching)
      .catch(this.handleError);
  }

  insert(networkswitching: Networkswitching): Promise<Networkswitching> {
    return this.http
      .post(this.networkswitchingUrl, JSON.stringify(networkswitching), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(networkswitching: Networkswitching): Promise<void> {
    const url = `${this.networkswitchingUrl}/${networkswitching._id}`;
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

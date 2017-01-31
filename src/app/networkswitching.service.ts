/**
 * Created by pfu on 15/11/16.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {Networkswitching} from './model/networkswitching';
import {Sorting} from './model/Sorting';
import {CommonRestService} from "./common-rest.service";



@Injectable()
export class NetworkswitchingService extends CommonRestService {

  private static NETWORKSWITCHING_URL = 'api/nwsws';  // URL to web api

  constructor(http: Http) {
    super(http);
  }


  /**
   * @param projectId
   * @param filter text to filter on
   * @param sorting
   * @param offset where to start, 0 = from start
   * @param limit max number of records to return (via Promise)
   * @returns {any}
   */
  getNetworkswitchings(projectId: string, filter: string, sorting: Sorting[], offset: number, limit: number): Promise<Networkswitching[]> {

    filter = encodeURIComponent(filter);
    const filterQuery = filter ? `&q=${filter}` : '';

    const sortingQueryPart = encodeURIComponent(sorting.map(sort => sort.toRestQuery()).join(','));
    const sortingQuery = `?sort=${sortingQueryPart}&offset=${offset}&limit=${limit}`;

    return this
      .get(`${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}/${sortingQuery}${filterQuery}`)
      .toPromise()
      .then(response => {
        return Networkswitching.jsonArrToObjArr(response.json().data);
      })
      .catch(CommonRestService.handleError);
  }


  getNetworkswitching(projectId: string, id: string): Promise<Networkswitching> {
    return this
      .get(`${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}/${id}`)
      .toPromise()
      .then(response => {
        return Networkswitching.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }


  updateNetworkswitching(projectId: string, networkswitching: Networkswitching): Promise<Networkswitching> {
    const url = `${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}/${networkswitching.id}`;
    return this
      .put(url, networkswitching)
      .toPromise()
      .then(response => {
        return Networkswitching.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }

  insertNetworkswitching(projectId: string, networkswitching: Networkswitching): Promise<Networkswitching> {
    return this
      .post(`${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}`, networkswitching)
      .toPromise()
      .then(response => {
        return Networkswitching.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }

  deleteNetworkswitching(projectId: string, networkswitching: Networkswitching): Promise<void> {
    return this
      .delete(`${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}/${networkswitching.getId()}`)
      .toPromise()
      .then(() => null)
      .catch(CommonRestService.handleError);
  }
}

/**
 * Created by pfu on 15/11/16.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {Networkswitching} from './model/networkswitching';
import {Sorting} from './model/sorting';
import {CommonRestService} from "./common-rest.service";
import {SessionStorageService} from "./session-storage.service";


/**
 * REST service for handling network switchings.
 */
@Injectable()
export class NetworkswitchingService extends CommonRestService {

  private static NETWORKSWITCHING_URL = 'api/nwsws';  // URL to web api


  /**
   * @param http injected service
   * @param sessionStorageService injected service
   */
  constructor(http: Http,
              sessionStorageService: SessionStorageService) {
    super(http, sessionStorageService);
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

    const filterQuery = filter ? `&q=${encodeURIComponent(filter)}` : '';
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


  /**
   * @param projectId
   * @param id
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  getNetworkswitching(projectId: string, id: string): Promise<Networkswitching> {
    return this
      .get(`${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}/${id}`)
      .toPromise()
      .then(response => {
        return Networkswitching.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }


  /**
   * @param projectId
   * @param networkswitching
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  updateNetworkswitching(projectId: string, networkswitching: Networkswitching): Promise<Networkswitching> {
    const url = `${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}/${networkswitching.getId()}`;
    return this
      .put(url, networkswitching)
      .toPromise()
      .then(response => {
        return Networkswitching.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }


  /**
   * @param projectId
   * @param networkswitching
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  insertNetworkswitching(projectId: string, networkswitching: Networkswitching): Promise<Networkswitching> {
    return this
      .post(`${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}`, networkswitching)
      .toPromise()
      .then(response => {
        return Networkswitching.jsonToObj(response.json());
      })
      .catch(CommonRestService.handleError);
  }


  /**
   * @param projectId
   * @param networkswitching
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  deleteNetworkswitching(projectId: string, networkswitching: Networkswitching): Promise<void> {
    return this
      .delete(`${NetworkswitchingService.NETWORKSWITCHING_URL}/${projectId}/${networkswitching.getId()}`)
      .toPromise()
      .then(() => null)
      .catch(CommonRestService.handleError);
  }
}

import {Log} from 'ng2-logger/ng2-logger'
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from './model/user';
import {SessionStorageService} from "./session-storage.service";


/**
 * Base class for all REST calls to the PortMatrix server.
 */
@Injectable()
export class CommonRestService {
  protected static log = Log.create('common-rest-service');

  private static LOGIN_URL = '/api/login';
  protected static JSON_HEADERS = new Headers({'Content-Type': 'application/json'});
  private static redirectUrl: string;


  /**
   * @param http injected service
   * @param sessionStorageService injected service
   */
  constructor(private http: Http,
              protected sessionStorageService: SessionStorageService) {
  }


  /**
   * Set a URL where user shall be redirected after successful login.
   * @param url
   */
  setRedirectUrl(url: string) {
    CommonRestService.redirectUrl = url;
  }

  /**
   * @returns {string} set redirected URL
   */
  getRedirectUrl(): string {
    return CommonRestService.redirectUrl;
  }


  /**
   * Executes HTTP GET
   * @param url
   * @returns {Observable<Response>}
   */
  protected get(url: string) {
    return this.http.get(url, this.getHeaders());
  }


  /**
   * Executes HTTP POST
   * @param url
   * @param body
   * @returns {Observable<Response>}
   */
  protected post(url: string, body: any) {
    return this.http.post(url, CommonRestService.stringify(body), this.getJsonHeaders());
  }


  /**
   * Executes HTTP PUT
   * @param url
   * @param body
   * @returns {Observable<Response>}
   */
  protected put(url: string, body: any) {
    return this.http.put(url, CommonRestService.stringify(body), this.getJsonHeaders());
  }


  /**
   * Executes HTTP DELETE
   * @param url
   * @returns {Observable<Response>}
   */
  protected delete(url: string) {
    return this.http.delete(url, this.getJsonHeaders());
  }


  /**
   * Validates credentials at the server side. On success returned JWT token is saved and reapplied on further calls.
   * @param email
   * @param password
   * @returns {any}
   */
  validateUser(email: string, password: string): Promise<User> {
    return this
      .post(CommonRestService.LOGIN_URL, {email: email, password: password})
      .toPromise()
      .then(response => {
        const jsonBody = response.json();
        this.setJwtToken(jsonBody);
        return jsonBody['user'];
      })
      .catch(CommonRestService.handleError);
  }


  protected setJwtToken(jsonBody) {
    if (jsonBody) {
      this.sessionStorageService.setJwtToken(jsonBody['token']);
    }
  }


  logout(): Promise<any> {
    this.sessionStorageService.setJwtToken(null);
    return Promise.resolve();
  }


  isLoggedIn(): boolean {
    return !!this.sessionStorageService.getJwtToken();
  }


  static handleError(error: any): Promise<any> {
    CommonRestService.log.er('An error occurred', error);
    CommonRestService.redirectUrl = undefined; // don't try more than once (it may have got invalid)
    const text = error.text && error.text();
    return Promise.reject(error.message || text || error);
  }


  protected getHeaders(headers = new Headers()): Object {
    let headerObj = {headers: headers};
    const jwtToken = this.sessionStorageService.getJwtToken();
    if (jwtToken) {
      headers.set('authorization', "Bearer " + jwtToken);
    }
    return headerObj;
  }


  protected getJsonHeaders(): Object {
    return this.getHeaders(CommonRestService.JSON_HEADERS);
  }


  private static stringify(body: any): string {
    if (typeof body === 'string') {
      return body;
    }
    return JSON.stringify(body);
  }
}

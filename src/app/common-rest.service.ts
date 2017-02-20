import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from './model/user';


@Injectable()
export class CommonRestService {

  private static LOGIN_URL = '/api/login';
  protected static JSON_HEADERS = new Headers({'Content-Type': 'application/json'});

  // static: token must be shared between UserManagemntService, ProjectService etc.!
  private static token = undefined;

  private redirectUrl: string;

  constructor(private http: Http) {
  }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public getRedirectUrl(): string {
    return this.redirectUrl;
  }


  protected get(url: string) {
    return this.http.get(url, this.getHeaders());
  }

  protected post(url: string, body: any) {
    return this.http.post(url, this.stringify(body), this.getJsonHeaders());
  }

  protected put(url: string, body: any) {
    return this.http.put(url, this.stringify(body), this.getJsonHeaders());
  }

  protected delete(url: string) {
    return this.http.delete(url, this.getJsonHeaders());
  }


  /**
   *
   * @param email
   * @param password
   * @returns {any}
   */
  public validateUser(email: string, password: string): Promise<User> {
    return this
      .post(CommonRestService.LOGIN_URL, {email: email, password: password})
      .toPromise()
      .then(response => {
        const jsonBody = response.json();
        this.setJwtToken(jsonBody);
        return jsonBody['user'];
      })
      .catch(this.handleError);
  }


  protected setJwtToken(jsonBody) {
    if (jsonBody) {
      CommonRestService.token = jsonBody['token'];
    }
  }


  public logout(): Promise<any> {
    CommonRestService.token = undefined;
    return Promise.resolve();
  }


  public isLoggedIn(): boolean {
    return !!CommonRestService.token;
  }


  public handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    this.redirectUrl = undefined; // don't try more than once (it may have got invalid)
    return Promise.reject(error.message || error);
  }


  protected getHeaders(headers = new Headers()): Object {
    let headerObj = {headers: headers};
    if (CommonRestService.token) {
      headers.set('authorization', "Bearer " + CommonRestService.token);
    }
    return headerObj;
  }


  protected getJsonHeaders(): Object {
    return this.getHeaders(CommonRestService.JSON_HEADERS);
  }


  private stringify(body: any): string {
    if (typeof body === 'string') {
      return body;
    }
    return JSON.stringify(body);
  }
}

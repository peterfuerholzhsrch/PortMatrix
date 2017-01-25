import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from './model/user';


@Injectable()
export class CommonRestService {

  private static LOGIN_URL = '/api/login';
  protected static JSON_HEADERS = new Headers({'Content-Type': 'application/json'});

  private token = undefined;

  constructor(private http: Http) {
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
  public validateUser(email: string, password: string): Promise<User> {  // TODO validate PW!!!
    return this
      .post(CommonRestService.LOGIN_URL, {email: email, password: password})
      .toPromise()
      .then(response => {
        const jsonBody = response.json();
        this.token = jsonBody['token'];
        return jsonBody['user'];
      })
      .catch(CommonRestService.handleError);
  }

  public logout(): Promise<any> {
    this.token = undefined;
    return Promise.resolve();
  }


  public isLoggedIn(): boolean {
    return !!this.token;
  }


  protected static handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  protected getHeaders(headers = new Headers()): Object {
    let headerObj = {headers: headers};
      if (this.token) {
        headerObj['authorization'] = "Bearer " + this.token;
    }
    return headerObj;
  }

  protected getJsonHeaders(): Object {
    return this.getHeaders(CommonRestService.JSON_HEADERS);
    // let headers = CommonRestService.JSON_HEADERS;
    // if (token) {
    //   headers['authorization'] = "Bearer " + token;
    // }
    // return headers;
  }


  private stringify(body: any): string {
    if (typeof body === 'string') {
      return body;
    }
    return JSON.stringify(body);
  }
}

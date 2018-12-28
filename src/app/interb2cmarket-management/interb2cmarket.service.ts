import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InterB2cMarket } from './../shared/model/interb2cmarket.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
})
export class Interb2cmarketService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: Http, private httpClient: HttpClient) { }
  allInterB2cMarket(): Observable<any> {
    const addUrl = 'allinterb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2cMarket[]>(url);
  }
  addSingleInterB2cMarket(data: any): Observable<any> {
    const addUrl = 'singleinterb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<InterB2cMarket[]>(url, data);
  }
  duplicateInterB2cMarket(): Observable<any> {
    const addUrl = 'duplicateinterb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2cMarket[]>(url);
  }
  editInterB2cMarket(edit): Observable<any> {
    const addUrl = 'interb2cmarket/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<InterB2cMarket[]>(url, edit);
  }
  deleteInterB2cMarket(edit): Observable<any> {

    const addUrl = 'interb2cmarketdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<InterB2cMarket[]>(url);
  }
}

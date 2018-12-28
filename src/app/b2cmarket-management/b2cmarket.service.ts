import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { B2cMarket } from './../shared/model/b2cmarket.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
})
export class B2cmarketService {
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
  allB2cMarket(): Observable<any> {
    const addUrl = 'allb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2cMarket[]>(url);
  }
  addSingleB2cMarket(data: any): Observable<any> {
    const addUrl = 'singleb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<B2cMarket[]>(url, data);
  }
  duplicateB2cMarket(): Observable<any> {
    const addUrl = 'duplicateb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2cMarket[]>(url);
  }
  editB2cMarket(edit): Observable<any> {
    const addUrl = 'b2cmarket/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<B2cMarket[]>(url, edit);
  }
  deleteB2cMarket(edit): Observable<any> {

    const addUrl = 'b2cmarketdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<B2cMarket[]>(url);
}
}

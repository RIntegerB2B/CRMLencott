
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InterB2cCustomer } from './../shared/model/interb2ccustomer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
})
export class Interb2ccustomerService {
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
  allInterB2cCustomer(): Observable<any> {
    const addUrl = 'allinterb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2cCustomer[]>(url);
  }
  addSingleInterB2cCustomer(data: any): Observable<any> {
    const addUrl = 'singleinterb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<InterB2cCustomer[]>(url, data);
  }
  duplicateInterB2cCustomer(): Observable<any> {
    const addUrl = 'duplicateinterb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2cCustomer[]>(url);
  }
  editInterB2cCustomer(edit): Observable<any> {
    const addUrl = 'interb2ccustomer/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<InterB2cCustomer[]>(url, edit);
  }
  deleteInterB2cCustomer(edit): Observable<any> {

    const addUrl = 'interb2ccustomerdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<InterB2cCustomer[]>(url);
}
}

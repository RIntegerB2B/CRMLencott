import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InterB2bCustomer } from './../shared/model/interb2bcustomer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
}) export class Interb2bcustomerService {
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
  /* createCustomer(data: any): Observable<any> {
    const addUrl = 'customers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  } */
  // all customer details
  allInterB2bcustomer(): Observable<any> {
    const addUrl = 'allinterb2bcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2bCustomer[]>(url);
  }
  duplicateInterB2bCustomer(): Observable<any> {
    const addUrl = 'duplicateinterb2bcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2bCustomer[]>(url);
  }
  editInterB2bCustomer(edit): Observable<any> {
    const addUrl = 'interb2bcustomer/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<InterB2bCustomer[]>(url, edit);
  }
  addSingleInterB2bCustomer(data: any): Observable<any> {
    const addUrl = 'singleinterb2bcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<InterB2bCustomer[]>(url, data);
  }
  deleteInterB2bCustomer(edit): Observable<any> {

    const addUrl = 'interb2bcustomerdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<InterB2bCustomer[]>(url);
  }
}

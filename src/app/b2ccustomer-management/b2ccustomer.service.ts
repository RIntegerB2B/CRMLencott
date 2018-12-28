import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { B2cCustomer } from './../shared/model/b2ccustomer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';


@Injectable({
  providedIn: 'root'
})
export class B2ccustomerService {
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
  allB2cCustomer(): Observable<any> {
    const addUrl = 'allb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2cCustomer[]>(url);
  }
  addSingleB2cCustomer(data: any): Observable<any> {
    const addUrl = 'singleb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<B2cCustomer[]>(url, data);
  }
  duplicateB2cCustomer(): Observable<any> {
    const addUrl = 'duplicateb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2cCustomer[]>(url);
  }
  editB2cCustomer(edit): Observable<any> {
    const addUrl = 'b2ccustomer/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<B2cCustomer[]>(url, edit);
  }
  deleteB2cCustomer(edit): Observable<any> {

    const addUrl = 'b2ccustomerdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<B2cCustomer[]>(url);
}
}

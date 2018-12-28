import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Others } from './../shared/model/other.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
})

export class OthersService {

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
    allOthers(): Observable<any> {
      const addUrl = 'allothers';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.get<Others[]>(url);
    }
    addSingleOthers(data: any): Observable<any> {
      const addUrl = 'singleothers';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<Others[]>(url, data);
    }
    duplicateOthers(): Observable<any> {
      const addUrl = 'duplicateothers';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.get<Others[]>(url);
    }
    editOthers(edit): Observable<any> {
      const addUrl = 'others/';
      const url: string = this.serviceUrl + addUrl + edit._id;
      return this.httpClient.put<Others[]>(url, edit);
    }
   /*  mobileMessage(phone) {
      const addUrl = 'customers/phone/';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<ResponseResult>(url, phone);
    } */
   /*  emailMessage(email) {
      const addUrl = 'customers/emailId/';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<ResponseResult>(url, email);
    } */
    deleteOthers(edit): Observable<any> {
      const addUrl = 'othersdelete/';
      const url: string = this.serviceUrl + addUrl + edit._id;
      return this.httpClient.delete<Others[]>(url);
    }
  }

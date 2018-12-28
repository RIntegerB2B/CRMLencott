import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vendor } from './../shared/model/vendor.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

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
  allVendor(): Observable<any> {
    const addUrl = 'allvendor';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Vendor[]>(url);
  }
  duplicateVendor(): Observable<any> {
    const addUrl = 'duplicatevendor';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Vendor[]>(url);
  }
  addSingleVendor(data: any): Observable<any> {
    const addUrl = 'singlevendor';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Vendor[]>(url, data);
  }
  editVendor(edit): Observable<any> {
    const addUrl = 'vendor/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Vendor[]>(url, edit);
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

  deleteVendor(edit): Observable<any> {

    const addUrl = 'vendordelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Vendor[]>(url);
  }
}

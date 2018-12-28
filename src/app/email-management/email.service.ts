import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';
import { Customer } from './../shared/model/customer.model';
import { B2cMarket } from './../shared/model/b2cmarket.model';
import { B2bMarket } from './../shared/model/b2bmarket.model';
import { B2cCustomer } from './../shared/model/b2ccustomer.model';
import { Employee } from './../shared/model/employee.model';
import { Agent } from './../shared/model/agent.model';
import { Vendor } from './../shared/model/vendor.model';
import { Others } from './../shared/model/other.model';
import { InterB2bCustomer } from './../shared/model/interb2bcustomer.model';
import { InterB2bMarket } from './../shared/model/interb2bmarket.model';
import { InterB2cCustomer } from './../shared/model/interb2ccustomer.model';
import { InterB2cMarket } from './../shared/model/interb2cmarket.model';
import { ImagesUpload } from './../email-management/email-mangement/image.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
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
  // all customer details
  allB2bCustomer(): Observable<any> {
    const addUrl = 'allcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  allB2bMarket(): Observable<any> {
    const addUrl = 'allb2bmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2bMarket[]>(url);
  }
  allB2cCustomer(): Observable<any> {
    const addUrl = 'allb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2cCustomer[]>(url);
  }
  allB2cMarket(): Observable<any> {
    const addUrl = 'allb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<B2cMarket[]>(url);
  }
  allVendor(): Observable<any> {
    const addUrl = 'allvendor';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Vendor[]>(url);
  }
  allAgent(): Observable<any> {
    const addUrl = 'allagent';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Agent[]>(url);
  }
  allOthers(): Observable<any> {
    const addUrl = 'allothers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Others[]>(url);
  }
  allEmployee(): Observable<any> {
    const addUrl = 'allemployee';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Employee[]>(url);
  }
  allInterB2bcustomer(): Observable<any> {
    const addUrl = 'allinterb2bcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2bCustomer[]>(url);
  }
  allInterB2bMarket(): Observable<any> {
    const addUrl = 'allinterb2bmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2bMarket[]>(url);
  }
  allInterB2cCustomer(): Observable<any> {
    const addUrl = 'allinterb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2cCustomer[]>(url);
  }

  allInterB2cMarket(): Observable<any> {
    const addUrl = 'allinterb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<InterB2cMarket[]>(url);
  }
  emailSender(email) {
    const addUrl = 'customers/mail/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ResponseResult>(url, email);
  }
  uploadImages(data): Observable<any> {
    const addUrl = 'upload';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ImagesUpload[]>(url, data);
  }
  findAllImage(): Observable<any> {
    const addUrl = 'allimage';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<ImagesUpload[]>(url);
  }
  deleteSingleImages(deleteData): Observable<any> {
    const addUrl = 'imageDelete/';
    const url: string = this.serviceUrl + addUrl + deleteData._id;
    return this.httpClient.delete<ImagesUpload[]>(url);
  }
}

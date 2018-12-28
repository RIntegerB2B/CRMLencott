import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agent } from './../shared/model/agent.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
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
  allAgent(): Observable<any> {
    const addUrl = 'allagent';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Agent[]>(url);
  }
  duplicateAgent(): Observable<any> {
    const addUrl = 'duplicateagent';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Agent[]>(url);
  }
  addSingleAgent(data: any): Observable<any> {
    const addUrl = 'singleagent';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Agent[]>(url, data);
  }
  editAgent(edit): Observable<any> {
    const addUrl = 'agent/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Agent[]>(url, edit);
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

  deleteAgent(edit): Observable<any> {

    const addUrl = 'agentdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Agent[]>(url);
  }
}

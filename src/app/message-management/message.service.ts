import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from './../shared/model/message.model';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
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
  allMessage(): Observable<any> {
    const addUrl = 'allmessage';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Message[]>(url);
  }
  createMessage(data: any): Observable<any> {
    const addUrl = 'messagetemplate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Message[]>(url, data);
  }
  deleteMessage(edit): Observable<any> {

    const addUrl = 'messagedelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Message[]>(url);
  }
  editMessage(edit): Observable<any> {

    const addUrl = 'messageedit/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Message[]>(url, edit);
  }
}

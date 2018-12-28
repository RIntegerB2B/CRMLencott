import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as rxjs from 'rxjs';
import { LogIn } from './login/login.model';
import { AppSetting } from './../config/appSetting';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';
import { Register } from './register/register.model';
import { AccessPermission } from './permission/accessPermission.model';
@Injectable({
  providedIn: 'root'
})

export class UserManagementService {
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
  constructor(private http: Http, private httpClient: HttpClient, private router: Router
    , private route: ActivatedRoute) {
  }

  logIn(data: LogIn): Observable<any> {
    const addUrl = 'admin/validate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LogIn>(url, data);
  }
  registration(data: Register) {
    const addUrl = 'register';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Register>(url, data);
  }
  allRegister(): Observable<any> {
    const addUrl = 'allregister';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Register[]>(url);
  }
  permissionUsers(data: AccessPermission) {
    const addUrl = 'userdetails';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<AccessPermission>(url, data);
  }
  permissionUserType() {
    const addUrl = 'usertypereg';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<AccessPermission[]>(url);
  }
}

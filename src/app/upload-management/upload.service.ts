import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './../shared/model/customer.model';
import { B2cMarket } from './../shared/model/b2cmarket.model';
import { B2bMarket } from './../shared/model/b2bmarket.model';
import { B2cCustomer } from './../shared/model/b2ccustomer.model';
import { Employee } from './../shared/model/employee.model';
import { Vendor } from './../shared/model/vendor.model';
import { Agent } from './../shared/model/agent.model';
import { Others } from './../shared/model/other.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ResponseResult } from './../shared/model/response-result.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
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
  createCustomer(data: any): Observable<any> {
    const addUrl = 'customers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  }
  createB2cMarket(data: any): Observable<any> {
    const addUrl = 'b2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<B2cMarket[]>(url, data);
  }
  createB2bMarket(data: any): Observable<any> {
    const addUrl = 'b2bmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<B2bMarket[]>(url, data);
  }
  createB2cCustomer(data: any): Observable<any> {
    const addUrl = 'b2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<B2cCustomer[]>(url, data);
  }
  createEmployee(data: any): Observable<any> {
    const addUrl = 'employee';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Employee[]>(url, data);
  }
  createVendor(data: any): Observable<any> {
    const addUrl = 'vendor';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Vendor[]>(url, data);
  }
  createAgent(data: any): Observable<any> {
    const addUrl = 'agent';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Agent[]>(url, data);
  }
  createOthers(data: any): Observable<any> {
    const addUrl = 'others';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Others[]>(url, data);
  }
  exportAsExcelFile(json: any[], excelFileName: string) {
    try {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
    }    catch (Error) {
      alert(Error);
  }
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

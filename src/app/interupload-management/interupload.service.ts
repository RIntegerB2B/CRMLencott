import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InterB2bCustomer } from './../shared/model/interb2bcustomer.model';
import { InterB2bMarket } from './../shared/model/interb2bmarket.model';
import { InterB2cCustomer } from './../shared/model/interb2ccustomer.model';
import { InterB2cMarket } from './../shared/model/interb2cmarket.model';
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

export class InteruploadService {
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
  createInterB2bCustomer(data: any): Observable<any> {
    const addUrl = 'interb2bcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<InterB2bCustomer[]>(url, data);
  }
  createInterB2bMarket(data: any): Observable<any> {
    const addUrl = 'interb2bmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<InterB2bMarket[]>(url, data);
  }
  createInterB2cMarket(data: any): Observable<any> {
    const addUrl = 'interb2cmarket';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<InterB2cCustomer[]>(url, data);
  }
  createInterB2cCustomer(data: any): Observable<any> {
    const addUrl = 'interb2ccustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<InterB2cMarket[]>(url, data);
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

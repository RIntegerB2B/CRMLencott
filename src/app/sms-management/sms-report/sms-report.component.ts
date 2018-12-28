import { Component, OnInit, ViewChild } from '@angular/core';
import { SmsService } from './../sms.service';
import {  SmsReport } from './../sms-report/sms-report.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'app-sms-report',
  templateUrl: './sms-report.component.html',
  styleUrls: ['./sms-report.component.css']
})
export class SmsReportComponent implements OnInit {
  smsReport: any;
  smsReportModel: SmsReport[];
  array = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchString: string;
  constructor(private smsService: SmsService) { }

  ngOnInit() {
    this.getAllSmsReport();
  }

  viewSmsDetails(data)   {
    this.smsService.viewReport(data);
  }
  getAllSmsReport() {
    this.smsService.findAllSmsReport()
      .subscribe((response) => {
        this.smsReport = new MatTableDataSource<SmsReport>(response);
        this.smsReport.paginator = this.paginator;
        this.smsReport = response;
        this.smsReportModel = response;
        this.array = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.smsReport = part;
  }

}

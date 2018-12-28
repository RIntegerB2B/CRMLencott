
import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { InterB2bCustomer } from './../../shared/model/interb2bcustomer.model';
import { InterB2bMarket } from './../../shared/model/interb2bmarket.model';
import { InterB2cCustomer } from './../../shared/model/interb2ccustomer.model';
import { InterB2cMarket } from './../../shared/model/interb2cmarket.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InteruploadService } from './../interupload.service';
import { HttpClient } from '@angular/common/http';
import { AlertBox } from './../../shared/alert/alert.model';
@Component({
  selector: 'app-interupload-management',
  templateUrl: './interupload-management.component.html',
  styleUrls: ['./interupload-management.component.css']
})
export class InteruploadManagementComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  alertBox: AlertBox;
  alertBoxSuccess: AlertBox;
  customerDetailsForm: FormGroup;
  interB2bCustomer: InterB2bCustomer[];
  interB2bMarket: InterB2bMarket[];
  interB2cCustomer: InterB2cCustomer[];
  interB2cMarket: InterB2cMarket[];
  fullInterB2bCustomer;
  fullInterB2bMarket;
  fullInterB2cCustomer;
  fullInterB2cMarket;
  excelInterB2CmarketData: any = [{
    customerName: 'customerName1',
    gender: 'male/Female',
    mobileNumber: '9988776655',
    email: 'sample@gmail.com',
    dateOfBirth: '01/01/2018',
    nationality: 'indian',
    categoryType: 'IT or ITES',
    designation: 'developer',
    location: 'bangalore',
  }];

  excelInterB2CcustomerData: any = [{
    customerName: 'customerName1',
    gender: 'male/Female',
    mobileNumber: '9988776655',
    email: 'sample@gmail.com',
    dateOfBirth: '01/01/2018',
    nationality: 'indian',
    categoryType: 'IT or ITES',
    designation: 'developer',
    location: 'bangalore',
  }];
  excelInterB2BCustomerData: any = [
    {
      customerName: 'customerName1',
      mobileNumber: 'Male/Female',
      whatsAppNo: '9988776655',
      landLine: '080-4455666',
      email: 'sample@gmail.com',
      companyName: 'Company Name',
      companyAddress: 'Company Address',
      location: 'bangalore',
      gstNumber: 'GSTINBN123',
      customerGrade: 'A',
      brandName: 'Test'
    }
  ];
  excelInterB2BMarketData: any = [
    {
      customerName: 'customerName1',
      mobileNumber: 'Male/Female',
      whatsAppNo: '9988776655',
      landLine: '080-4455666',
      email: 'sample@gmail.com',
      companyName: 'Company Name',
      companyAddress: 'Company Address',
      location: 'bangalore',
      gstNumber: 'GSTINBN123',
      customerGrade: 'A',
      brandName: 'Test'
    }
  ];

  constructor(private interUploadService: InteruploadService) { }

  ngOnInit() {
    this.alertBoxSuccess = new AlertBox(
      'displayNone',
      'Information',
      ''
    );
  }
  
  /* b2b customer */

  interB2bCustomerUpload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.fullInterB2bCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.interUploadService.createInterB2bCustomer(this.fullInterB2bCustomer)
        .subscribe(detail => {
          this.interB2bCustomer = detail;
          if (detail.length > 0)           {
            this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Upload Successfully' ;
            this.alertBox = this.alertBoxSuccess;
          }
        }, error => {
          this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Server Down please try again';
            console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingFileB2bCustomer(event) {
    this.file = event.target.files[0];
  }
  /* b2c customer */
  interB2bMarketUpload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.fullInterB2bMarket = XLSX.utils.sheet_to_json(worksheet);
      this.interUploadService.createInterB2bMarket(this.fullInterB2bMarket)
        .subscribe(detail => {
          this.interB2bMarket = detail;
          if (detail.length > 0)           {
            this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Upload Successfully' ;
            this.alertBox = this.alertBoxSuccess;
          }
        }, error => {
          this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Server Down please try again';
            console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingFileB2bMarket(event) {
    this.file = event.target.files[0];
  }
  interB2cMarketUpload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.fullInterB2cMarket = XLSX.utils.sheet_to_json(worksheet);
      this.interUploadService.createInterB2cMarket(this.fullInterB2cMarket)
        .subscribe(detail => {
          this.interB2cMarket = detail;
          if (detail.length > 0)           {
            this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Upload Successfully' ;
            this.alertBox = this.alertBoxSuccess;
          }
        }, error => {
          this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Server Down please try again';
            console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingFileB2cMarket(event) {
    this.file = event.target.files[0];
  }
  interB2cCustomerUpload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.fullInterB2cCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.interUploadService.createInterB2cCustomer(this.fullInterB2cCustomer)
        .subscribe(detail => {
          this.interB2bCustomer = detail;
          if (detail.length > 0)           {
            this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Upload Successfully' ;
            this.alertBox = this.alertBoxSuccess;
          }
        }, error => {
          this.alertBoxSuccess.displayClass = 'displayBlock' ;
            this.alertBoxSuccess.modalBody = 'Server Down please try again';
            console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingFileB2cCustomer(event) {
    this.file = event.target.files[0];
  }

  /* sample xlsx download */

  interB2bMarketAsXLSX() {
    this.interUploadService.exportAsExcelFile(this.excelInterB2BMarketData, 'International B2Bmarket');
  }
  interB2bCustomerAsXLSX() {
    this.interUploadService.exportAsExcelFile(this.excelInterB2BCustomerData, 'International B2Bcustomer');
  }
  interB2cCustomerAsXLSX() {
    this.interUploadService.exportAsExcelFile(this.excelInterB2CcustomerData, 'International B2Bcustomer');
  }
  interB2cMarketAsXLSX() {
    this.interUploadService.exportAsExcelFile(this.excelInterB2CmarketData, 'International B2Cmarket');
  }
}


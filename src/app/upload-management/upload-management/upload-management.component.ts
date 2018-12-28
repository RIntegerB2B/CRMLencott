
import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { Customer } from './../../shared/model/customer.model';
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { B2bMarket } from './../../shared/model/b2bmarket.model';
import { B2cCustomer } from './../../shared/model/b2ccustomer.model';
import { Vendor } from './../../shared/model/vendor.model';
import { Employee } from './../../shared/model/employee.model';
import { Others } from './../../shared/model/other.model';
import { Agent } from './../../shared/model/agent.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from './../upload.service';
import { HttpClient } from '@angular/common/http';
import { AlertBox } from './../../shared/alert/alert.model';
import { AlertService } from './../../shared/alert/alert.service';

@Component({
  selector: 'app-upload-management',
  templateUrl: './upload-management.component.html',
  styleUrls: ['./upload-management.component.css']
})
export class UploadManagementComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  customerDetailsForm: FormGroup;
  b2cMarket: B2cMarket[];
  b2bMarket: B2bMarket[];
  b2cCustomer: B2cCustomer[];
  employee: Employee[];
  vendor: Vendor[];
  others: Others;
  agent: Agent;
  fullVendor;
  customers;
  b2cMarketCustomer;
  fullb2cCustomer;
  fullEmployee;
  b2bMarketCustomer;
  newCustomer: Customer[] = [];
  excelB2CmarketData: any = [{
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

  excelB2CcustomerData: any = [{
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
  excelB2BCustomerData: any = [
    {
      customerName: 'customerName1',
      mobileNumber: '9988776655',
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
  excelB2BMarketData: any = [
    {
      customerName: 'customerName1',
      mobileNumber: '9988776655',
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
  excelEmployeeData: any = [
    {
      empName: 'employeeName',
      empNo: '001',
      gender: 'male/female',
      landLine: '080-4455666',
      email: 'sample@gmail.com',
      mobileNumber: '9988776655',
      whatsappNo: '9966557755',
      dateOfJoin: '1/1/2018',
      dateOfBirth: '1/1/2018',
      designation: 'operator',
      address: 'full address',
    }
  ];
  excelVendorData: any = [
    {
      vendorName: 'vendorName',
      mobileNumber: '9966779655',
      whatsAppNo: '9966557755',
      landLine: '080-4455666',
      email: 'sample@gmail.com',
      vendorService: 'vendeorService',
      address: 'full address of vendor',
      vendorCompanyName: 'company Name of vendor',
      companyAddress: 'company Address of vendor',
      location: 'bangalore',
      gstNumber: 'GSTINBN123',
      vendorGrade: 'B'
    }
  ];
  excelAgentData: any = [
    {
      agentName: 'agentName',
      mobileNumber: '9966779655',
      whatsAppNo: '9966557755',
      landLine: '080-4455666',
      email: 'sample@gmail.com',
      agentService: 'agentService',
      address: 'full address of agent',
      agentCompanyName: 'company Name of agent',
      companyAddress: 'company Address of agent',
      location: 'bangalore',
      gstNumber: 'GSTINBN123',
      agentGrade: 'B'
    }
  ];
  excelOtherData: any = [
    {
      name: 'Name',
      gender: 'male/female',
      email: 'sample@gmail.com',
      mobileNumber: '9966557755',
      location: 'bangalore',
      address: 'full address'
    }
  ];


  constructor(private uploadService: UploadService, private alertService: AlertService) { }

  ngOnInit() {
  }
  /* b2b customer */

  Upload() {
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
      this.customers = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createCustomer(this.customers)
        .subscribe(detail => {
          this.newCustomer = detail;
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  /* b2c customer */
  UploadB2CCustomer() {
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
      this.fullb2cCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createB2cCustomer(this.fullb2cCustomer)
        .subscribe(detail => {
          this.b2cCustomer = detail;
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingB2cCustomerfile(event) {
    this.file = event.target.files[0];
  }

  /* b2c market */
  UploadB2CMarket() {
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
      this.b2cMarketCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createB2cMarket(this.b2cMarketCustomer)
        .subscribe(detail => {
          this.b2cMarket = detail;
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingB2cMarketfile(event) {
    this.file = event.target.files[0];
  }
  /* b2b market */
  UploadB2BMarket() {
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
      this.b2bMarketCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createB2bMarket(this.b2bMarketCustomer)
        .subscribe(detail => {
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingB2BMarketfile(event) {
    this.file = event.target.files[0];
  }

  UploadEmployee() {
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
      this.fullEmployee = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createEmployee(this.fullEmployee)
        .subscribe(detail => {
          this.employee = detail;
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingEmployeefile(event) {
    this.file = event.target.files[0];
  }

   /* Vendor */
  UploadVendor() {
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
      this.fullVendor = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createVendor(this.fullVendor)
        .subscribe(detail => {
      this.vendor = detail;
      console.log(detail);
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingVendorfile(event) {
    this.file = event.target.files[0];
  }
  uploadAgent() {
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
      this.fullVendor = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createAgent(this.fullVendor)
        .subscribe(detail => {
          this.agent = detail;
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingAgentFile(event) {
    this.file = event.target.files[0];
  }
  /* Agent */
  uploadOthers() {
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
      this.fullVendor = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createOthers(this.fullVendor)
        .subscribe(detail => {
          this.others = detail;
          console.log(detail);
          if (detail.length > 0)           {
            this.alertService.confirm({message: `Upload Successfully `});
          }
        }, error => {
          this.alertService.confirm({message: `Server Down please try again`});
          console.log(error);
          });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingOthersFile(event) {
    this.file = event.target.files[0];
  }
/* sample xlsx download */

  b2cCustomerAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelB2CcustomerData,
      'B2Ccustomer');
  }
  b2bMarketAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelB2BMarketData, 'B2Bmarket');
  }
  b2bCustomerAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelB2BCustomerData, 'B2Bcustomer');
  }
  b2cMarketAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelB2CmarketData, 'B2Cmarket');
  }
  employeeAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelEmployeeData, 'Employee');
  }
  vendorAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelVendorData, 'vendor');
  }
  agentAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelAgentData, 'agent');
  }
  otherAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelOtherData, 'other');
  }
}


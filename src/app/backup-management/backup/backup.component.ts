import { Component, OnInit } from '@angular/core';
import { UploadService } from './../../upload-management/upload.service';
import { BackupService } from './../backup.service';
import { B2cCustomer } from './../../shared/model/b2ccustomer.model';
import { B2bMarket } from './../../shared/model/b2bmarket.model';
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { Customer } from './../../shared/model/customer.model';
import { Employee } from './../../shared/model/employee.model';
import { Agent } from './../../shared/model/agent.model';
import { Vendor } from './../../shared/model/vendor.model';
import { Others } from './../../shared/model/other.model';
import { InterB2bCustomer } from './../../shared/model/interb2bcustomer.model';
import { InterB2bMarket } from './../../shared/model/interb2bmarket.model';
import { InterB2cCustomer } from './../../shared/model/interb2ccustomer.model';
import { InterB2cMarket } from './../../shared/model/interb2cmarket.model';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  constructor(private uploadService: UploadService, private backupService: BackupService) { }
  newB2cCustomer: B2cCustomer[] = [];
  newB2bMarket: B2bMarket[] = [];
  newB2cMarket: B2cMarket[] = [];
  newB2bCustomer: Customer[] = [];
  newEmployee: Employee[] = [];
  newAgent: Agent[] = [];
  newVendor: Vendor[] = [];
  newOthers: Others[] = [];
  newInterB2bCustomer: InterB2bCustomer[] = [];
  newInterB2bMarket: InterB2bMarket[] = [];
  newInterB2cCustomer: InterB2cCustomer[] = [];
  newInterB2cMarket: InterB2cMarket[] = [];
  ngOnInit() {
    this.getAllB2bMarket();
    this.getAllB2cCustomer();
    this.getAllB2cMarket();
    this.getAllB2cCustomer();
    this.getAllInterB2bCustomer();
    this.getAllInterB2cMarket();
    this.getAllInterB2bMarket();
    this.getAllEmployee();
    this.getAllAgent();
    this.getAllVendor();
    this.getAllOthers();
    this.getAllB2bCustomer();
  }
  getAllB2cCustomer() {
    this.backupService.allB2cCustomer().subscribe(data => {
      this.newB2cCustomer = data;
      console.log(this.newB2cCustomer);
    }, error => {
      console.log(error);
    });
  }
  getAllB2cMarket() {
    this.backupService.allB2cMarket().subscribe(data => {
      this.newB2cMarket = data;
      console.log(this.newB2cMarket);
    }, error => {
      console.log(error);
    });
  }
  getAllB2bCustomer() {
    this.backupService.allB2bCustomer().subscribe(data => {
      this.newB2bCustomer = data;
      console.log(this.newB2bCustomer);
    }, error => {
      console.log(error);
    });
  }
  getAllB2bMarket() {
    this.backupService.allB2bMarket().subscribe(data => {
      this.newB2bMarket = data;
      console.log(this.newB2bMarket);
    }, error => {
      console.log(error);
    });
  }
  getAllInterB2cCustomer() {
    this.backupService.allInterB2cCustomer().subscribe(data => {
      this.newInterB2cCustomer = data;
      console.log(this.newInterB2cCustomer);
    }, error => {
      console.log(error);
    });
  }
  getAllInterB2cMarket() {
    this.backupService.allInterB2cMarket().subscribe(data => {
      this.newInterB2cMarket = data;
      console.log(this.newInterB2cMarket);
    }, error => {
      console.log(error);
    });
  }
  getAllInterB2bCustomer() {
    this.backupService.allInterB2bcustomer().subscribe(data => {
      this.newInterB2bCustomer = data;
      console.log(this.newInterB2bCustomer);
    }, error => {
      console.log(error);
    });
  }
  getAllInterB2bMarket() {
    this.backupService.allInterB2bMarket().subscribe(data => {
      this.newInterB2bMarket = data;
      console.log(this.newInterB2bMarket);
    }, error => {
      console.log(error);
    });
  }
  getAllEmployee() {
    this.backupService.allEmployee().subscribe(data => {
      this.newEmployee = data;
      console.log(this.newEmployee);
    }, error => {
      console.log(error);
    });
  }
  getAllVendor() {
    this.backupService.allVendor().subscribe(data => {
      this.newVendor = data;
      console.log(this.newVendor);
    }, error => {
      console.log(error);
    });
  }
  getAllAgent() {
    this.backupService.allAgent().subscribe(data => {
      this.newAgent = data;
      console.log(this.newAgent);
    }, error => {
      console.log(error);
    });
  }
  getAllOthers() {
    this.backupService.allOthers().subscribe(data => {
      this.newOthers = data;
      console.log(this.newOthers);
    }, error => {
      console.log(error);
    });
  }
  b2bCustomerAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newB2bCustomer,
      'B2BCustomer');
  }
  b2bMarketAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newB2bMarket,
      'B2BMarket');
  }
  b2cCustomerAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newB2cCustomer,
      'B2Ccustomer');
  }
  b2cMarketAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newB2cMarket,
      'B2cMarket');
  }
  interB2cCustomerAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newInterB2cCustomer,
      'InterB2cCustomer');
  }
  interB2cMarketAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newInterB2cMarket,
      'InterB2cMarket');
  }
  interB2bCustomerAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newInterB2bCustomer,
      'InterB2bCustomer');
  }
  interB2bMarketAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newInterB2bMarket,
      'InterB2bMarket');
  }
  employeeAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newEmployee,
      'Employee');
  }
  agentAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newAgent,
      'agent');
  }
  vendorAsXLSX() {

    this.uploadService.exportAsExcelFile(this.newVendor,
      'vendor');
  }
  othersAsXLSX() {
    this.uploadService.exportAsExcelFile(this.newOthers,
      'others');
  }
}

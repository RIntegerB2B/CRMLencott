
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { InterB2bCustomer   } from './../../shared/model/interb2bcustomer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interb2bcustomerService } from './../interb2bcustomer.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';


@Component({
  selector: 'app-interb2bcustomer-management',
  templateUrl: './interb2bcustomer-management.component.html',
  styleUrls: ['./interb2bcustomer-management.component.css']
})
export class Interb2bcustomerManagementComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  interB2bCustomerDetailsForm: FormGroup;
  newCustomer: InterB2bCustomer[] = [];
  @ViewChild('myTable') table: any;
  mobileNumbers;
  selectedMobileNumbers = [];
  temp = [];
  role: AccessPermission;
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  constructor(private fb: FormBuilder,
    private interb2bcustomerService: Interb2bcustomerService
    , private http: HttpClient, private dialog: MatDialog,
    private headerSideService: HeaderSideService,
    private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar
    ) { }

  ngOnInit() {
    this.createForm();
    this.getAllInterB2bCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }

  updateFilter(event) {
    // this.showData = true;
    const val = event.target.value.toLowerCase();
    /* if (this.dataSource.length !== 0) { */
    const filterCustomer = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    filterCustomer.splice(filterCustomer.length - 1);

    console.log(filterCustomer);
    if (!filterCustomer.length) {
      return;
    }
    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= filterCustomer.length; i++) {
        const column = filterCustomer[i];
        console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.newCustomer = rows;
    this.table.offset = 0;
  }
  changePageLimit(limit: any) {
    this.currentPageLimit = parseInt(limit, 10);
  }
  onLimitChange(limit: any) {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] test with server-side paging.
        this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
      }
    });
  }

  createForm() {
    this.interB2bCustomerDetailsForm = this.fb.group({
      _id: [],
      emailMessage: [],
      customerName: [],
      countryCode: ['', Validators.maxLength(5)],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      country: [],
      gstNumber: [],
      customerGrade: [],
      brandName: [],
      message: []
    });
  }
  // CRUD start
  cancel(edit) {
    edit.editing = false;
  }

  updateInterB2bCustomer(interB2bCustomerDetailsForm: FormGroup, row) {
    this.interb2bcustomerService.editInterB2bCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* deleteInterB2BCustomer(interB2bCustomerDetailsForm: FormGroup, row) {
    row.editing = false;
    interB2bCustomerDetailsForm.reset();
    this.interb2bcustomerService.deleteInterB2bCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  deleteInterB2BCustomer(interB2bCustomerDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.interb2bcustomerService.deleteInterB2bCustomer(row)
            .subscribe(data => {
              this.newCustomer = data;
              this.snack.open('Successfully Deleted!', 'OK', { duration: 4000, panelClass: ['blue-snackbar'] });
            }, error => {
              console.log(error);
            }
            );
        }
      });
    }
  addInterB2bCustomer(interB2bCustomerDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(InterB2bCustomerAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  // CRUD end
  editInterB2bCustomer(interB2bCustomerDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(InterB2bCustomerEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  getAllInterB2bCustomer() {
    this.interb2bcustomerService.allInterB2bcustomer().subscribe(data => {
      this.newCustomer = data;
      /* this.temp = [...data]; */
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // duplicate customer data find
  duplicateInterB2bCustomerData() {
    this.interb2bcustomerService.duplicateInterB2bCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
}

@Component({
  templateUrl: './interb2bcustomer-edit.component.html'
})
export class InterB2bCustomerEditComponent implements OnInit {
  interB2bCustomerDetailsForm: FormGroup;
  newCustomer: InterB2bCustomer[] = [] ;
  constructor(private fb: FormBuilder, private interb2bcustomerService:
    Interb2bcustomerService, public dialogRef: MatDialogRef<InterB2bCustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2bCustomer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.interB2bCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      mobileNumber: [],
      countryCode: ['', Validators.maxLength(5)],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      country: [],
      gstNumber: [],
      customerGrade: [],
      brandName: []
    });
  }
  update(interB2bCustomerDetailsForm: FormGroup, row) {
    this.interb2bcustomerService.editInterB2bCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './interb2bcustomer-add.component.html'
})
export class InterB2bCustomerAddComponent implements OnInit {
  interB2bCustomerDetailsForm: FormGroup;
  newCustomer: InterB2bCustomer;
  constructor(private fb: FormBuilder, private interb2bcustomerService:
    Interb2bcustomerService, public dialogRef: MatDialogRef<InterB2bCustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2bCustomer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.interB2bCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      countryCode: ['', Validators.maxLength(5)],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      country: [],
      gstNumber: [],
      customerGrade: [],
      brandName: []
    });
  }
  addMember(interB2bCustomerDetailsForm: FormGroup)   {
     this.newCustomer = new InterB2bCustomer(
      interB2bCustomerDetailsForm.controls.customerName.value,
      interB2bCustomerDetailsForm.controls.countryCode.value,
      interB2bCustomerDetailsForm.controls.mobileNumber.value,
      interB2bCustomerDetailsForm.controls.whatsAppNo.value,
      interB2bCustomerDetailsForm.controls.landLine.value,
      interB2bCustomerDetailsForm.controls.email.value,
      interB2bCustomerDetailsForm.controls.location.value,
      interB2bCustomerDetailsForm.controls.country.value,
      interB2bCustomerDetailsForm.controls.companyName.value,
      interB2bCustomerDetailsForm.controls.companyAddress.value,
      interB2bCustomerDetailsForm.controls.gstNumber.value,
      interB2bCustomerDetailsForm.controls.customerGrade.value,
      interB2bCustomerDetailsForm.controls.brandName.value
    );
    this.interb2bcustomerService.addSingleInterB2bCustomer(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

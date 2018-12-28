import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { InterB2cCustomer } from './../../shared/model/interb2ccustomer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interb2ccustomerService } from './../interb2ccustomer.service';
import { map } from 'rxjs/operators';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-interb2ccustomer-management',
  templateUrl: './interb2ccustomer-management.component.html',
  styleUrls: ['./interb2ccustomer-management.component.css']
})
export class Interb2ccustomerManagementComponent implements OnInit {

  @ViewChild('myTable') table: any;
  newCustomer: InterB2cCustomer[] = [];
  role: AccessPermission;
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  interB2cCustomerDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private interb2ccustomerService: Interb2ccustomerService,
    private dialog: MatDialog, private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar) { }
  ngOnInit() {
    this.createInterB2cCustomerForm();
    this.getAllInterB2cCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createInterB2cCustomerForm() {
    this.interB2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      countryCode: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      country: [],
      nationality: [],
      categoryType: [],
      designation: [],
      location: []
    });
  }
  changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }
  onLimitChange(limit: any): void {
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
  getAllInterB2cCustomer() {
    this.interb2ccustomerService.allInterB2cCustomer().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
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

  getDuplicateInterB2cCustomer() {
    this.interb2ccustomerService.duplicateInterB2cCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelInterB2cCustomer(edit) {
    edit.editing = false;
  }

  updateInterB2cCustomer(interB2cCustomerDetailsForm: FormGroup, row) {
    this.interb2ccustomerService.editInterB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* getDeleteInterB2cCustomer(interB2cCustomerDetailsForm: FormGroup, row) {
    row.editing = false;
    interB2cCustomerDetailsForm.reset();
    this.interb2ccustomerService.deleteInterB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  getDeleteInterB2cCustomer(interB2cCustomerDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.interb2ccustomerService.deleteInterB2cCustomer(row)
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
  addCustomer(interB2cCustomerDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(InterB2ccustomerAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  // CRUD end
  getEditInterB2cCustomer(interB2cCustomerDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(InterB2ccustomerEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './interb2ccustomer-edit.component.html'
})
export class InterB2ccustomerEditComponent implements OnInit {
  interB2cCustomerDetailsForm: FormGroup;
  newCustomer: InterB2cCustomer[] = [];
  constructor(private fb: FormBuilder, private interb2ccustomerService:
    Interb2ccustomerService, public dialogRef: MatDialogRef<InterB2ccustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2cCustomer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createInterB2cMarketForm();
  }

  createInterB2cMarketForm() {
    this.interB2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      countryCode: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      country: [],
      categoryType: [],
      designation: [],
      location: []
    });
  }
  updateInterB2cCustomer(interB2cCustomerDetailsForm: FormGroup, row) {
    this.interb2ccustomerService.editInterB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './interb2ccustomer-add.component.html'
})
export class InterB2ccustomerAddComponent implements OnInit {
  interB2cCustomerDetailsForm: FormGroup;
  newCustomer: InterB2cCustomer;
  constructor(private fb: FormBuilder, private interb2ccustomerService: Interb2ccustomerService
    , public dialogRef: MatDialogRef<InterB2ccustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2cCustomer) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.interB2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      countryCode: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      country: [],
      designation: [],
      location: []
    });
  }
  addMember(interB2cCustomerDetailsForm: FormGroup) {
    this.newCustomer = new InterB2cCustomer(
      interB2cCustomerDetailsForm.controls.customerName.value,
      interB2cCustomerDetailsForm.controls.countryCode.value,
      interB2cCustomerDetailsForm.controls.mobileNumber.value,
      interB2cCustomerDetailsForm.controls.email.value,
      interB2cCustomerDetailsForm.controls.gender.value,
      interB2cCustomerDetailsForm.controls.dateOfBirth.value,
      interB2cCustomerDetailsForm.controls.country.value,
      interB2cCustomerDetailsForm.controls.nationality.value,
      interB2cCustomerDetailsForm.controls.categoryType.value,
      interB2cCustomerDetailsForm.controls.designation.value,
      interB2cCustomerDetailsForm.controls.location.value,
    );
    this.interb2ccustomerService.addSingleInterB2cCustomer(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}





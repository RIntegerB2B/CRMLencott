import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { B2cCustomer } from './../../shared/model/b2ccustomer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { B2ccustomerService } from './../b2ccustomer.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

// import { CustomerEditComponent } from './../../customer-management/customer-management/customer-management.component';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';






@Component({
  selector: 'app-b2ccustomer-management',
  templateUrl: './b2ccustomer-management.component.html',
  styleUrls: ['./b2ccustomer-management.component.css']
})
export class B2ccustomerManagementComponent implements OnInit {
  @ViewChild('myTable') table: any;
  newCustomer: B2cCustomer[] = [];
  role: AccessPermission;
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  b2cCustomerDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private b2ccustomerService: B2ccustomerService, private dialog: MatDialog,
    private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar) { }
  ngOnInit() {
    this.createB2cCustomerForm();
    this.getAllB2cCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createB2cCustomerForm() {
    this.b2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
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
  getAllB2cCustomer() {
    this.b2ccustomerService.allB2cCustomer().subscribe(data => {
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

  getDuplicateB2cCustomer() {
    this.b2ccustomerService.duplicateB2cCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelB2cCustomer(edit) {
    edit.editing = false;
  }

  updateB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    this.b2ccustomerService.editB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* getDeleteB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    row.editing = false;
    b2cCustomerDetailsForm.reset();
    this.b2ccustomerService.deleteB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  getDeleteB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.b2ccustomerService.deleteB2cCustomer(row)
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
  addCustomer(b2cCustomerDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(B2ccustomerAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  // CRUD end
  getEditB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(B2ccustomerEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './b2ccustomer-edit.component.html'
})
export class B2ccustomerEditComponent implements OnInit {
  b2cCustomerDetailsForm: FormGroup;
  newCustomer: B2cCustomer[] = [];
  constructor(private fb: FormBuilder, private b2ccustomerService:
    B2ccustomerService, public dialogRef: MatDialogRef<B2ccustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2cCustomer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createB2cMarketForm();
  }

  createB2cMarketForm() {
    this.b2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      designation: [],
      location: []
    });
  }
  updateB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    this.b2ccustomerService.editB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './b2ccustomer-add.component.html'
})
export class B2ccustomerAddComponent implements OnInit {
  b2cCustomerDetailsForm: FormGroup;
  newCustomer: B2cCustomer;
  constructor(private fb: FormBuilder, private b2ccustomerService: B2ccustomerService
    , public dialogRef: MatDialogRef<B2ccustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2cCustomer) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.b2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      designation: [],
      location: []
    });
  }
  addMember(b2cCustomerDetailsForm: FormGroup) {
    this.newCustomer = new B2cCustomer(
      b2cCustomerDetailsForm.controls.customerName.value,
      b2cCustomerDetailsForm.controls.gender.value,
      b2cCustomerDetailsForm.controls.mobileNumber.value,
      b2cCustomerDetailsForm.controls.email.value,
      b2cCustomerDetailsForm.controls.dateOfBirth.value,
      b2cCustomerDetailsForm.controls.nationality.value,
      b2cCustomerDetailsForm.controls.categoryType.value,
      b2cCustomerDetailsForm.controls.designation.value,
      b2cCustomerDetailsForm.controls.location.value,
    );
    this.b2ccustomerService.addSingleB2cCustomer(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}





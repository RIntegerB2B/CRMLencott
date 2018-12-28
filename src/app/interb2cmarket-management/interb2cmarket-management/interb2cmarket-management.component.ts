import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { InterB2cMarket } from './../../shared/model/interb2cmarket.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Interb2cmarketService } from './../interb2cmarket.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CustomerEditComponent } from './../../customer-management/customer-management/customer-management.component';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';

@Component({
  selector: 'app-interb2cmarket-management',
  templateUrl: './interb2cmarket-management.component.html',
  styleUrls: ['./interb2cmarket-management.component.css']
})
export class Interb2cmarketManagementComponent implements OnInit {
  newCustomer: InterB2cMarket[] = [];
  role: AccessPermission;
  @ViewChild('myTable') table: any;
  interB2cMarketDetailsForm: FormGroup;
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private interb2cmarketService: Interb2cmarketService,
     private dialog: MatDialog,
     private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar
     ) { }



  ngOnInit() {
    this.createInterB2cMarketForm();
    this.getAllInterB2cMarketCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
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


  createInterB2cMarketForm() {
    this.interB2cMarketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      countryCode: ['', Validators.maxLength(5)],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      country: [],
      designation: [],
      location: [],
      itemsPerPage: new FormControl('100'),
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

  getAllInterB2cMarketCustomer() {
    this.interb2cmarketService.allInterB2cMarket().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  duplicateInterB2cMarketCustomer() {
    this.interb2cmarketService.duplicateInterB2cMarket().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelInterB2cMarketCustomer(edit) {
    edit.editing = false;
  }

  updateInterB2cMarketCustomer(interB2cMarketDetailsForm: FormGroup, row) {
    this.interb2cmarketService.editInterB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* deleteInterB2cMarketCustomer(interB2cMarketDetailsForm: FormGroup, row) {
    row.editing = false;
    interB2cMarketDetailsForm.reset();
    this.interb2cmarketService.deleteInterB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  deleteInterB2cMarketCustomer(interB2cMarketDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.interb2cmarketService.deleteInterB2cMarket(row)
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
  addCustomer(interB2cMarketDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(InterB2cmarketAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  // CRUD end
  editInterB2cMarketCustomer(interB2cMarketDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(InterB2cmarketEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './interb2cmarket-edit.component.html'
})
export class InterB2cmarketEditComponent implements OnInit {
  interB2cMarketDetailsForm: FormGroup;
  newCustomer: InterB2cMarket[] = [];
  constructor(private fb: FormBuilder, private interb2cmarketService:
    Interb2cmarketService, public dialogRef: MatDialogRef<InterB2cmarketEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2cMarket) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createInterB2cMarketForm();
  }
  createInterB2cMarketForm() {
    this.interB2cMarketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      countryCode: ['', Validators.maxLength(5)],
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
  updateInterB2cMarketCustomer(interB2cMarketDetailsForm: FormGroup, row) {
    this.interb2cmarketService.editInterB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
@Component({
  templateUrl: './interb2cmarket-add.component.html'
})
export class InterB2cmarketAddComponent implements OnInit {
  interB2cMarketDetailsForm: FormGroup;
  newCustomer: InterB2cMarket;
  constructor(private fb: FormBuilder, private interb2cmarketService: Interb2cmarketService
    , public dialogRef: MatDialogRef<InterB2cmarketAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2cMarket) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.interB2cMarketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      countryCode: ['', Validators.maxLength(5)],
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
  addMember(interB2cMarketDetailsForm: FormGroup) {
    this.newCustomer = new InterB2cMarket(
      interB2cMarketDetailsForm.controls.customerName.value,
      interB2cMarketDetailsForm.controls.countryCode.value,
      interB2cMarketDetailsForm.controls.mobileNumber.value,
      interB2cMarketDetailsForm.controls.gender.value,
      interB2cMarketDetailsForm.controls.email.value,
      interB2cMarketDetailsForm.controls.dateOfBirth.value,
      interB2cMarketDetailsForm.controls.country.value,
      interB2cMarketDetailsForm.controls.nationality.value,
      interB2cMarketDetailsForm.controls.categoryType.value,
      interB2cMarketDetailsForm.controls.designation.value,
      interB2cMarketDetailsForm.controls.location.value,
    );
    this.interb2cmarketService.addSingleInterB2cMarket(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

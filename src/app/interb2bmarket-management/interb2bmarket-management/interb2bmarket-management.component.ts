import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { InterB2bMarket } from './../../shared/model/interb2bmarket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interb2bmarketService } from './../interb2bmarket.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';



@Component({
  selector: 'app-interb2bmarket-management',
  templateUrl: './interb2bmarket-management.component.html',
  styleUrls: ['./interb2bmarket-management.component.css']
})
export class Interb2bmarketManagementComponent implements OnInit {
  newCustomer: InterB2bMarket[] = [];
  @ViewChild('myTable') table: any;
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];
  role: AccessPermission;
  interB2bMarketDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private interb2bmarketService: Interb2bmarketService, private dialog: MatDialog,
    private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar
    ) { }
  ngOnInit() {
    this.createInterB2bMarketForm();
    this.getAllInterB2bMarketCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createInterB2bMarketForm() {
    this.interB2bMarketDetailsForm = this.fb.group({
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
  changePageLimit(limit) {
    this.currentPageLimit = parseInt(limit, 10);
  }
  onLimitChange(limit) {
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
  getAllInterB2bMarketCustomer() {
    this.interb2bmarketService.allInterB2bMarket().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  duplicateInterB2bMarketCustomer() {
    this.interb2bmarketService.duplicateInterB2bMarket().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelInterB2bMarketCustomer(edit) {
    edit.editing = false;
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


  updateInterB2bMarketCustomer(interB2bMarketDetailsForm: FormGroup, row) {
    this.interb2bmarketService.editInterB2bMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* deleteInterB2bMarketCustomer(interB2bMarketDetailsForm: FormGroup, row) {
    row.editing = false;
    interB2bMarketDetailsForm.reset();
    this.interb2bmarketService.deleteInterB2bMarket(row).subscribe(data => {
      if (data) {
      this.newCustomer = this.newCustomer.filter(customer => customer._id !== row);
      }
    }, error => {
      console.log(error);
    });
  } */
  deleteInterB2bMarketCustomer(interB2bMarketDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.interb2bmarketService.deleteInterB2bMarket(row)
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
  addInterB2bMarket(interB2bMarketDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(InterB2bmarketAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  // CRUD end
  editInterB2bMarketCustomer(interB2bMarketDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(InterB2bmarketEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './interb2bmarket-edit.component.html'
})
export class InterB2bmarketEditComponent implements OnInit {
  interB2bMarketDetailsForm: FormGroup;
  newCustomer: InterB2bMarket[] = [];
  constructor(private fb: FormBuilder, private interb2bmarketService:
    Interb2bmarketService, public dialogRef: MatDialogRef<InterB2bmarketEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2bMarket) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createInterB2bMarketForm();
  }

  createInterB2bMarketForm() {
    this.interB2bMarketDetailsForm = this.fb.group({
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
  updateInterB2bMarketCustomer(interB2bMarketDetailsForm: FormGroup, row) {
    this.interb2bmarketService.editInterB2bMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './interb2bmarket-add.component.html'
})
export class InterB2bmarketAddComponent implements OnInit {
  interB2bMarketDetailsForm: FormGroup;
  newCustomer: InterB2bMarket;
  constructor(private fb: FormBuilder, private interb2bmarketService: Interb2bmarketService
    , public dialogRef: MatDialogRef<InterB2bmarketAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterB2bMarket) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.interB2bMarketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      countryCode: ['', Validators.maxLength(5)],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      country: [],
      location: [],
      gstNumber: [],
      customerGrade: [],
      brandName: []
    });
  }
  addMember(interB2bMarketDetailsForm: FormGroup) {
    this.newCustomer = new InterB2bMarket(
      interB2bMarketDetailsForm.controls.customerName.value,
      interB2bMarketDetailsForm.controls.countryCode.value,
      interB2bMarketDetailsForm.controls.mobileNumber.value,
      interB2bMarketDetailsForm.controls.whatsAppNo.value,
      interB2bMarketDetailsForm.controls.landLine.value,
      interB2bMarketDetailsForm.controls.email.value,
      interB2bMarketDetailsForm.controls.location.value,
      interB2bMarketDetailsForm.controls.country.value,
      interB2bMarketDetailsForm.controls.companyName.value,
      interB2bMarketDetailsForm.controls.companyAddress.value,
      interB2bMarketDetailsForm.controls.gstNumber.value,
      interB2bMarketDetailsForm.controls.customerGrade.value,
      interB2bMarketDetailsForm.controls.brandName.value
    );
    this.interb2bmarketService.addSingleInterB2bCustomer(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

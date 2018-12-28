import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { B2bMarket } from './../../shared/model/b2bmarket.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { B2bmarketService } from './../b2bmarket.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { Customer } from 'src/app/shared/model/customer.model';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';
import { AlertService } from './../../shared/alert/alert.service';


@Component({
  selector: 'app-b2bmarket-management',
  templateUrl: './b2bmarket-management.component.html',
  styleUrls: ['./b2bmarket-management.component.css']
})

export class B2bmarketManagementComponent implements OnInit {
  newCustomer: B2bMarket[] = [];
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
  b2bMarketDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private b2bmarketService: B2bmarketService, private dialog: MatDialog,
     private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar) { }
  ngOnInit() {
    this.createB2bMarketForm();
    this.getAllB2bMarketCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createB2bMarketForm() {
    this.b2bMarketDetailsForm = this.fb.group({
      _id: [],
      emailMessage: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
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
  getAllB2bMarketCustomer() {
    this.b2bmarketService.allB2bMarket().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  duplicateB2bMarketCustomer() {
    this.b2bmarketService.duplicateB2bMarket().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelB2bMarketCustomer(edit) {
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


  updateB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    this.b2bmarketService.editB2bMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* deleteB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    row.editing = false;
    b2bMarketDetailsForm.reset();
    this.b2bmarketService.deleteB2bMarket(row).subscribe(data => {
      if (data) {
      this.newCustomer = this.newCustomer.filter(customer => customer._id !== row);
      }
    }, error => {
      console.log(error);
    });
  } */
  deleteB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.b2bmarketService.deleteB2bMarket(row)
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
  addCustomer(b2bMarketDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(B2bmarketAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  // CRUD end
  editB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(B2bmarketEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './b2bmarket-edit.component.html'
})
export class B2bmarketEditComponent implements OnInit {
  b2bMarketDetailsForm: FormGroup;
  newCustomer: B2bMarket[] = [];
  constructor(private fb: FormBuilder, private b2bmarketService:
    B2bmarketService, public dialogRef: MatDialogRef<B2bmarketEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2bMarket) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createB2bMarketForm();
  }

  createB2bMarketForm() {
    this.b2bMarketDetailsForm = this.fb.group({
      _id: [],
      emailMessage: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      customerGrade: [],
      brandName: [],
      message: []
    });
  }
  updateB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    this.b2bmarketService.editB2bMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './b2bmarket-add.component.html'
})
export class B2bmarketAddComponent implements OnInit {
  b2bMarketDetailsForm: FormGroup;
  newCustomer: B2bMarket;
  constructor(private fb: FormBuilder, private b2bmarketService: B2bmarketService
    , public dialogRef: MatDialogRef<B2bmarketAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2bMarket) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.b2bMarketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      customerGrade: [],
      brandName: []
    });
  }
  addMember(b2bMarketDetailsForm: FormGroup) {
    this.newCustomer = new B2bMarket(
      b2bMarketDetailsForm.controls.customerName.value,
      b2bMarketDetailsForm.controls.mobileNumber.value,
      b2bMarketDetailsForm.controls.whatsAppNo.value,
      b2bMarketDetailsForm.controls.landLine.value,
      b2bMarketDetailsForm.controls.email.value,
      b2bMarketDetailsForm.controls.location.value,
      b2bMarketDetailsForm.controls.companyName.value,
      b2bMarketDetailsForm.controls.companyAddress.value,
      b2bMarketDetailsForm.controls.gstNumber.value,
      b2bMarketDetailsForm.controls.customerGrade.value,
      b2bMarketDetailsForm.controls.brandName.value
    );
    this.b2bmarketService.addSingleB2bCustomer(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

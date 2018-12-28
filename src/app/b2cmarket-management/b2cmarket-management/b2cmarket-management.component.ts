import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { B2cmarketService } from './../b2cmarket.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CustomerEditComponent } from './../../customer-management/customer-management/customer-management.component';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';
@Component({
  selector: 'app-b2cmarket-management',
  templateUrl: './b2cmarket-management.component.html',
  styleUrls: ['./b2cmarket-management.component.css']
})
export class B2cmarketManagementComponent implements OnInit {
  newCustomer: B2cMarket[] = [];
  role: AccessPermission;
  @ViewChild('myTable') table: any;
  b2cMarketDetailsForm: FormGroup;
 temp = [];
 currentPageLimit = 0;
 pageLimitOptions = [
   {value: 10},
   {value: 25},
   {value: 50},
   {value: 100},
 ];
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private b2cmarketService: B2cmarketService, private confirmAlertService: ConfirmAlertService,
     private snack: MatSnackBar,  private dialog: MatDialog) { }



  ngOnInit() {
    this.createB2cMarketForm();
    this.getAllB2cMarketCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
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


  createB2cMarketForm() {
    this.b2cMarketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
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

  getAllB2cMarketCustomer() {
    this.b2cmarketService.allB2cMarket().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  duplicateB2cMarketCustomer() {
    this.b2cmarketService.duplicateB2cMarket().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelB2cMarketCustomer(edit) {
    edit.editing = false;
  }

  updateB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    this.b2cmarketService.editB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* deleteB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    row.editing = false;
    b2cMarketDetailsForm.reset();
    this.b2cmarketService.deleteB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  deleteB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.b2cmarketService.deleteB2cMarket(row)
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

    const dialogRef = this.dialog.open(B2cmarketAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  // CRUD end
  editB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(B2cmarketEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './b2cmarket-edit.component.html'
})
export class B2cmarketEditComponent implements OnInit {
  b2cMarketDetailsForm: FormGroup;
  newCustomer: B2cMarket[] = [];
  constructor(private fb: FormBuilder, private b2cmarketService:
    B2cmarketService, public dialogRef: MatDialogRef<B2cmarketEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2cMarket) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createB2cMarketForm();
  }

  createB2cMarketForm() {
    this.b2cMarketDetailsForm = this.fb.group({
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
  updateB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    this.b2cmarketService.editB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
@Component({
  templateUrl: './b2cmarket-add.component.html'
})
export class B2cmarketAddComponent implements OnInit {
  b2cMarketDetailsForm: FormGroup;
  newCustomer: B2cMarket;
  constructor(private fb: FormBuilder, private b2cmarketService: B2cmarketService
    , public dialogRef: MatDialogRef<B2cmarketAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2cMarket) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.b2cMarketDetailsForm = this.fb.group({
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
  addMember(b2cMarketDetailsForm: FormGroup) {
    this.newCustomer = new B2cMarket(
      b2cMarketDetailsForm.controls.customerName.value,
      b2cMarketDetailsForm.controls.gender.value,
      b2cMarketDetailsForm.controls.mobileNumber.value,
      b2cMarketDetailsForm.controls.email.value,
      b2cMarketDetailsForm.controls.dateOfBirth.value,
      b2cMarketDetailsForm.controls.nationality.value,
      b2cMarketDetailsForm.controls.categoryType.value,
      b2cMarketDetailsForm.controls.designation.value,
      b2cMarketDetailsForm.controls.location.value,
    );
    this.b2cmarketService.addSingleB2cMarket(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

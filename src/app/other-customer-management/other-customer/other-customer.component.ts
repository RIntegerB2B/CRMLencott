import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Others } from './../../shared/model/other.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OthersService } from './../others.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';



@Component({
  selector: 'app-other-customer',
  templateUrl: './other-customer.component.html',
  styleUrls: ['./other-customer.component.css']
})
export class OtherCustomerComponent implements OnInit {

  @ViewChild('myTable') table: any;
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  newCustomer: Others[] = [];
  role: AccessPermission;
  othersDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private othersService: OthersService, private dialog: MatDialog,
    private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar
     ) { }
  ngOnInit() {
    this.createOthersForm();
    this.getAllOthers();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createOthersForm() {
    this.othersDetailsForm = this.fb.group({
      _id: [],
      name: [],
      gender: [],
      email: [],
      mobileNumber: [],
      location: [],
      address: []
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
  addCustomer(othersDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(OthersAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
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
  getAllOthers() {
    this.othersService.allOthers().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  getDuplicateOthers() {
    this.othersService.duplicateOthers().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelOthers(edit) {
    edit.editing = false;
  }

  updateOthers(othersDetailsForm: FormGroup, row) {
    this.othersService.editOthers(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* deleteOthers(othersDetailsForm: FormGroup, row) {
    row.editing = false;
    othersDetailsForm.reset();
    this.othersService.deleteOthers(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  deleteOthers(othersDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.othersService.deleteOthers(row)
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
  // CRUD end
  getEditOthers(othersDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(OthersEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './others-edit.component.html'
})
export class OthersEditComponent implements OnInit {
  othersDetailsForm: FormGroup;
  newCustomer: Others[] = [];
  constructor(private fb: FormBuilder, private othersService:
    OthersService, public dialogRef: MatDialogRef<OthersEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Others) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createOthersForm();
  }

  createOthersForm() {
    this.othersDetailsForm = this.fb.group({
      _id: [],
      name: [],
      gender: [],
      email: [],
      mobileNumber: [],
      location: [],
      address: []
    });
  }
  updateOthers(othersDetailsForm: FormGroup, row) {
    this.othersService.editOthers(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
@Component({
  templateUrl: './others-add.component.html'
})
export class OthersAddComponent implements OnInit {
  othersDetailsForm: FormGroup;
  newCustomer: Others;
  constructor(private fb: FormBuilder, private othersService: OthersService
    , public dialogRef: MatDialogRef<OthersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Others) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.othersDetailsForm = this.fb.group({
      name: [],
      gender: [],
      email: [],
      mobileNumber: [],
      location: [],
      address: []
    });
  }

  addMember(othersDetailsForm: FormGroup) {
    this.newCustomer = new Others(
      othersDetailsForm.controls.name.value,
      othersDetailsForm.controls.gender.value,
      othersDetailsForm.controls.email.value,
      othersDetailsForm.controls.mobileNumber.value,
      othersDetailsForm.controls.location.value,
      othersDetailsForm.controls.address.value,
    );
    this.othersService.addSingleOthers(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

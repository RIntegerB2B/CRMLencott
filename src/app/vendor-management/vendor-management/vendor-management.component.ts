import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Vendor } from './../../shared/model/vendor.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VendorService } from './../vendor.service';
import { map } from 'rxjs/operators';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent implements OnInit {
  @ViewChild('myTable') table: any;

  newCustomer: Vendor[] = [];
  temp = [];
  role: AccessPermission;
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  vendorDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private vendorService: VendorService, private dialog: MatDialog,
    private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar ) { }
  ngOnInit() {
    this.createVendorForm();
    this.getAllVendor();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createVendorForm() {
    this.vendorDetailsForm = this.fb.group({
      _id: [],
      vendorName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      vendorService: [],
      address: [],
      vendorCompanyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      vendorGrade: []
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
  getAllVendor() {
    this.vendorService.allVendor().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
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

  getDuplicateVendor() {
    this.vendorService.duplicateVendor().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelVendor(edit) {
    edit.editing = false;
  }
  addCustomer(vendorDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(VendorAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  updateVendor(vendorDetailsForm: FormGroup, row) {
    this.vendorService.editVendor(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* getDeleteVendor(vendorDetailsForm: FormGroup, row) {
    row.editing = false;
    vendorDetailsForm.reset();
    this.vendorService.deleteVendor(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  getDeleteVendor(vendorDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.vendorService.deleteVendor(row)
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
  getEditVendor(vendorDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(VendoorEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './vendor-edit-component.html'
})
export class VendoorEditComponent implements OnInit {
  vendorDetailsForm: FormGroup;
  newCustomer: Vendor[] = [];
  constructor(private fb: FormBuilder, private vendorService:
    VendorService, public dialogRef: MatDialogRef<VendoorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vendor) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createVendorForm();
  }

  createVendorForm() {
    this.vendorDetailsForm = this.fb.group({
      _id: [],
      vendorName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      vendorService: [],
      address: [],
      vendorCompanyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      vendorGrade: []
    });
  }
  updateVendor(vendorDetailsForm: FormGroup, row) {
    this.vendorService.editVendor(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './vendor-add-component.html'
})
export class VendorAddComponent implements OnInit {
  vendorDetailsForm: FormGroup;
  newCustomer: Vendor;
  constructor(private fb: FormBuilder, private vendorService: VendorService
    , public dialogRef: MatDialogRef<VendorAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vendor) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.vendorDetailsForm = this.fb.group({
      _id: [],
      vendorName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      vendorService: [],
      address: [],
      vendorCompanyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      vendorGrade: []
    });
  }
  addMember(vendorDetailsForm: FormGroup) {
    this.newCustomer = new Vendor(
      vendorDetailsForm.controls.vendorName.value,
      vendorDetailsForm.controls.mobileNumber.value,
      vendorDetailsForm.controls.whatsAppNo.value,
      vendorDetailsForm.controls.landLine.value,
      vendorDetailsForm.controls.email.value,
      vendorDetailsForm.controls.vendorService.value,
      vendorDetailsForm.controls.address.value,
      vendorDetailsForm.controls.vendorCompanyName.value,
      vendorDetailsForm.controls.companyAddress.value,
      vendorDetailsForm.controls.location.value,
      vendorDetailsForm.controls.gstNumber.value,
      vendorDetailsForm.controls.vendorGrade.value
    );
    this.vendorService.addSingleVendor(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

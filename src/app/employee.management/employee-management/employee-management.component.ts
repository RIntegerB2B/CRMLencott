import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Employee } from './../../shared/model/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from './../employee.service';
import { map } from 'rxjs/operators';
import { ConfirmAlertService } from './../../shared/confirm-alert/confirm-alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

// import { CustomerEditComponent } from './../../customer-management/customer-management/customer-management.component';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';


@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  @ViewChild('myTable') table: any;
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  newCustomer: Employee[] = [];
  role: AccessPermission;
  employeeDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private employeeService: EmployeeService, private dialog: MatDialog,
    private confirmAlertService: ConfirmAlertService, private snack: MatSnackBar
    ) { }
  ngOnInit() {
    this.createEmployeeForm();
    this.getAllEmployee();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createEmployeeForm() {
    this.employeeDetailsForm = this.fb.group({
      _id: [],
      empName: [],
      empNo: [],
      gender: [],
      mobileNumber: [],
      whatsAppNo: [],
      email: [],
      dateOfBirth: [],
      dateOfJoin: [],
      designation: [],
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
  addCustomer(employeeDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(EmployeeAddComponent, {
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
  getAllEmployee() {
    this.employeeService.allEmployee().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  getDuplicateEmployee() {
    this.employeeService.duplicateEmployee().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelEmployee(edit) {
    edit.editing = false;
  }

  updateEmployee(employeeDetailsForm: FormGroup, row) {
    this.employeeService.editEmployee(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  /* deleteEmployee(employeeDetailsForm: FormGroup, row) {
    row.editing = false;
    employeeDetailsForm.reset();
    this.employeeService.deleteEmployee(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  } */
  deleteEmployee(b2bMarketDetailsForm: FormGroup, row) {
    this.confirmAlertService.confirm({message: `Are you want to Delete `})
      .subscribe(res => {
        if (res) {
          this.employeeService.deleteEmployee(row)
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
  getEditEmployee(employeeDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(EmployeeEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './employee-edit-component.html'
})
export class EmployeeEditComponent implements OnInit {
  employeeDetailsForm: FormGroup;
  newCustomer: Employee[] = [];
  constructor(private fb: FormBuilder, private employeeService:
    EmployeeService, public dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createEmployeeForm();
  }

  createEmployeeForm() {
    this.employeeDetailsForm = this.fb.group({
      _id: [],
      empName: [],
      empNo: [],
      gender: [],
      mobileNumber: [],
      WhatsAppNo: [],
      email: [],
      dateOfBirth: [],
      dateOfJoin: [],
      designation: [],
      address: []
    });
  }
  updateEmployee(employeeDetailsForm: FormGroup, row) {
    this.employeeService.editEmployee(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
@Component({
  templateUrl: './employee-add-component.html'
})
export class EmployeeAddComponent implements OnInit {
  employeeDetailsForm: FormGroup;
  newCustomer: Employee;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService
    , public dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.employeeDetailsForm = this.fb.group({
      _id: [],
      empName: [],
      empNo: [],
      gender: [],
      mobileNumber: [],
      whatsAppNo: [],
      email: [],
      dateOfBirth: [],
      dateOfJoin: [],
      designation: [],
      address: []
    });
  }
  addMember(employeeDetailsForm: FormGroup) {
    this.newCustomer = new Employee(
      employeeDetailsForm.controls.empName.value,
      employeeDetailsForm.controls.empNo.value,
      employeeDetailsForm.controls.gender.value,
      employeeDetailsForm.controls.email.value,
      employeeDetailsForm.controls.mobileNumber.value,
      employeeDetailsForm.controls.whatsAppNo.value,
      employeeDetailsForm.controls.dateOfBirth.value,
      employeeDetailsForm.controls.dateOfJoin.value,
      employeeDetailsForm.controls.designation.value,
      employeeDetailsForm.controls.address.value
    );
    this.employeeService.addSingleEmployee(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

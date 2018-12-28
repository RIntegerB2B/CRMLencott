import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Register } from '../register/register.model';
import { AuthService } from '../auth.service';
import { AccessPermission } from '../permission/accessPermission.model';
import { HeaderSideService } from '../../shared/header-side/header-side.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  accessForm: FormGroup;
  register: Register;
  selectedPermissions = [];
  accessPermission: AccessPermission;
  message: Register;


  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private router: Router, public route: ActivatedRoute,
    public authService: AuthService,
    public headerSideService: HeaderSideService
  ) { }

  ngOnInit() {
    this.getAllRegister();
    this.userAccess();
  }

  userAccess() {
    this.accessForm = this.fb.group({
      _id: ['', Validators.required],
      userType: ['', Validators.required],
      currentDate: ['', Validators.required],
      b2bCustomer: this.fb.group({
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      b2bMarket: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      b2cCustomer: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      b2cMarket: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      interB2bCustomer: this.fb.group({
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      interB2bMarket: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      interB2cCustomer: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      interB2cMarket: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      employee: this.fb.group({
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      vendor: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      agent: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      others: this.fb.group( {
        addPermission: new FormControl(false, Validators.required),
        editPermission: new FormControl(false, Validators.required),
        deletePermission: new FormControl(false, Validators.required),
        smsPermission: new FormControl(false, Validators.required),
        emailPermission: new FormControl(false, Validators.required)
      }),
      menuList: this.fb.group( {
        b2bCustomerPermission: new FormControl(false, Validators.required),
        b2bMarketPermission: new FormControl(false, Validators.required),
        b2cCustomerPermission: new FormControl(false, Validators.required),
        b2cMarketPermission: new FormControl(false, Validators.required),
        employeePermission: new FormControl(false, Validators.required),
        vendorPermission: new FormControl(false, Validators.required),
        agentPermission: new FormControl(false, Validators.required),
        othersPermission: new FormControl(false, Validators.required),
        interB2bCustomerPermission: new FormControl(false, Validators.required),
        interB2bMarketPermission: new FormControl(false, Validators.required),
        interB2cCustomerPermission: new FormControl(false, Validators.required),
        interB2cMarketPermission: new FormControl(false, Validators.required),
        smsMenuPermission: new FormControl(false, Validators.required),
        emailMenuPermission: new FormControl(false, Validators.required),
        uploadPermission: new FormControl(false, Validators.required),
        reportPermission: new FormControl(false, Validators.required),
        interUploadPermission: new FormControl(false, Validators.required),
        userPermission: new FormControl(false, Validators.required),
        backupPermission: new FormControl(false, Validators.required),
        registerPermission: new FormControl(false, Validators.required),
        messagePermission: new FormControl(false, Validators.required)
      }),
        mobilePermission: [false, Validators.required]
    });
  }
  getAllRegister() {
    this.userManagementService.allRegister().subscribe(data => {
      this.register = data;
      console.log(this.register);
    }, error => {
      console.log(error);
    });
  }
  selectedAccess(e, value) {
    if (e.checked) {
      this.selectedPermissions.push(value);
    } else {
      const updateItem = this.selectedPermissions.find(this.findIndexToUpdate, value);

      const index = this.selectedPermissions.indexOf(updateItem);

      this.selectedPermissions.splice(index, 1);
    }
    console.log(this.selectedPermissions);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
  sendPermission(accessForm: FormGroup) {
    /* accessForm.controls._id.setValue(id);
    accessForm.controls.userType.setValue(userType); */
    this.accessPermission = new AccessPermission(
      accessForm.controls.userType.value,
      accessForm.controls.currentDate.value,
      accessForm.controls.b2bCustomer.value,
      accessForm.controls.b2bMarket.value,
      accessForm.controls.b2cCustomer.value,
      accessForm.controls.b2cMarket.value,
      accessForm.controls.interB2bCustomer.value,
      accessForm.controls.interB2bMarket.value,
      accessForm.controls.interB2cCustomer.value,
      accessForm.controls.interB2cMarket.value,
      accessForm.controls.employee.value,
      accessForm.controls.vendor.value,
      accessForm.controls.agent.value,
      accessForm.controls.others.value,
      accessForm.controls.menuList.value,
      accessForm.controls.mobilePermission.value
    );
    console.log(this.accessPermission);
    this.userManagementService.permissionUsers(this.accessPermission).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}

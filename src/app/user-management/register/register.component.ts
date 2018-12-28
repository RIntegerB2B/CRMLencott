import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Register } from './register.model';
import { AccessPermission } from './../permission/accessPermission.model';
import { AuthService } from '../auth.service';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  accessForm: FormGroup;
  register: Register;
  role: AccessPermission[];
  newUserType: any;
  selectedPermissions = [];
  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService, private router: Router, public route: ActivatedRoute,
    public authService: AuthService, public headerSideService: HeaderSideService, private snack: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.userRegister();
    this.role = JSON.parse(sessionStorage.getItem('role'));
    console.log('sample', this.role);
    this.getAllUserType();
  }
   getAllUserType() {
    this.userManagementService.permissionUserType().subscribe(data => {
      this.newUserType = data;
      console.log(this.newUserType);
    }, error => {
      console.log(error);
    });
  }
  userRegister() {
    this.registerForm = this.fb.group({
      _id: [''],
      userName: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      mobileNumber: ['', Validators.required],
      email: [''],
      userType: ['', Validators.required]
    });
  }
  regSubmit(registerForm: FormGroup) {
    this.register = new Register(
      registerForm.controls.userName.value,
      registerForm.controls.password.value,
      registerForm.controls.mobileNumber.value,
      registerForm.controls.email.value,
      registerForm.controls.userType.value
    );
    this.userManagementService.registration(this.register).subscribe(data => {
      console.log(data);
      this.snack.open('register successfully', 'OK', { duration: 1000, panelClass: ['blue-snackbar'] });
    }, error => {
      console.log(error);
    });
  }
}

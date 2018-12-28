import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './user-management/auth-guard.service';
import { AuthService } from './user-management/auth.service';
import { Routing } from './app.route';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavHeaderService } from './shared/nav-header/nav-header.service';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatStepperModule,
  MatDatepickerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {
  CustomerManagementComponent,
  CustomerEditComponent,
  CustomerAddComponent
} from './customer-management/customer-management/customer-management.component';
import { CustomerManagementService } from './customer-management/customer-management.service';
import { HeaderSideComponent } from './shared/header-side/header-side.component';
import { B2cmarketService } from './b2cmarket-management/b2cmarket.service';
import { B2bmarketService } from './b2bmarket-management/b2bmarket.service';
import { B2ccustomerService } from './b2ccustomer-management/b2ccustomer.service';
import { EmployeeService } from './employee.management/employee.service';
import { HeaderSideService } from './shared/header-side/header-side.service';
import { SmsManagementComponent } from './sms-management/sms-management/sms-management.component';
import { EmailManagementComponent } from './email-management/email-mangement/email-management.component';
import { UploadManagementComponent } from './upload-management/upload-management/upload-management.component';
import {
  B2cmarketManagementComponent,
  B2cmarketEditComponent, B2cmarketAddComponent
} from './b2cmarket-management/b2cmarket-management/b2cmarket-management.component';
import { LoginComponent } from './user-management/login/login.component';
import { RegisterComponent } from './user-management/register/register.component';
import { PermissionComponent } from './user-management/permission/permission.component';
import {
  B2bmarketManagementComponent,
  B2bmarketEditComponent, B2bmarketAddComponent
} from './b2bmarket-management/b2bmarket-management/b2bmarket-management.component';
import {
  B2ccustomerManagementComponent,
  B2ccustomerEditComponent, B2ccustomerAddComponent
} from './b2ccustomer-management/b2ccustomer-management/b2ccustomer-management.component';
import {
  EmployeeManagementComponent,
  EmployeeEditComponent, EmployeeAddComponent
} from './employee.management/employee-management/employee-management.component';
import {
  VendorManagementComponent, VendoorEditComponent,
  VendorAddComponent
} from './vendor-management/vendor-management/vendor-management.component';
import { BackupComponent } from './backup-management/backup/backup.component';
import {
  AgentManagementComponent,  AgentAddComponent, AgentEditComponent,
} from './agent-management/agent-management/agent-management.component';

import {
  OtherCustomerComponent, OthersAddComponent, OthersEditComponent
} from './other-customer-management/other-customer/other-customer.component';
import { Interb2bcustomerManagementComponent,
   InterB2bCustomerEditComponent,
  InterB2bCustomerAddComponent
 } from './interb2bcustomer-management/interb2bcustomer-management/interb2bcustomer-management.component';
import { Interb2bmarketManagementComponent, InterB2bmarketAddComponent,
  InterB2bmarketEditComponent
 } from './interb2bmarket-management/interb2bmarket-management/interb2bmarket-management.component';
import { Interb2ccustomerManagementComponent, InterB2ccustomerEditComponent,
  InterB2ccustomerAddComponent
 } from './interb2ccustomer-management/interb2ccustomer-management/interb2ccustomer-management.component';
import { Interb2cmarketManagementComponent, InterB2cmarketEditComponent,
  InterB2cmarketAddComponent
 } from './interb2cmarket-management/interb2cmarket-management/interb2cmarket-management.component';
import { MessageManagementComponent, MessageAddComponent, MessageEditComponent
} from './message-management/message-management/message-management.component';
import { InteruploadManagementComponent } from './interupload-management/interupload-management/interupload-management.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ConfirmAlertComponent } from './shared/confirm-alert/confirm-alert.component';
import {  ConfirmAlertService } from './shared/confirm-alert/confirm-alert.service';
import {  AlertService } from './shared/alert/alert.service';
import { SmsReportComponent } from './sms-management/sms-report/sms-report.component';
import { SmsReportViewComponent } from './sms-management/sms-report-view/sms-report-view.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { EmailImageComponent } from './email-management/email-image/email-image.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    CustomerManagementComponent,
    CustomerEditComponent,
    B2bmarketEditComponent,
    B2ccustomerEditComponent,
    VendoorEditComponent,
    CustomerAddComponent,
    EmployeeAddComponent,
    B2bmarketAddComponent,
    B2ccustomerAddComponent,
    B2cmarketAddComponent,
    VendorAddComponent,
    AgentAddComponent,
    AgentEditComponent,
    EmployeeEditComponent,
    HeaderSideComponent,
    SmsManagementComponent,
    EmailManagementComponent,
    UploadManagementComponent,
    B2cmarketManagementComponent,
    B2cmarketEditComponent,
    LoginComponent,
    RegisterComponent,
    PermissionComponent,
    B2bmarketManagementComponent,
    B2ccustomerManagementComponent,
    EmployeeManagementComponent,
    VendorManagementComponent,
    BackupComponent,
    AgentManagementComponent,
    OthersAddComponent,
    OthersEditComponent,
    OtherCustomerComponent,
    Interb2bcustomerManagementComponent,
    InterB2bCustomerEditComponent,
    InterB2bCustomerAddComponent,
    Interb2bmarketManagementComponent,
    InterB2bmarketAddComponent,
    InterB2bmarketEditComponent,
    InterB2ccustomerEditComponent,
    InterB2ccustomerAddComponent,
    Interb2ccustomerManagementComponent,
    Interb2cmarketManagementComponent,
    InterB2cmarketEditComponent,
    InterB2cmarketAddComponent,
    MessageManagementComponent,
    MessageAddComponent,
    MessageEditComponent,
    InteruploadManagementComponent,
    AlertComponent,
    ConfirmAlertComponent,
    SmsReportComponent,
    SmsReportViewComponent,
    EmailImageComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    RouterModule,
    MatInputModule,
    FlexLayoutModule,
    NgxDatatableModule,
    CdkTableModule,
    CdkTreeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [NavHeaderService, CustomerManagementService,
    HeaderSideService, B2bmarketService,
    B2ccustomerService, EmployeeService, ConfirmAlertService, AlertService,
    B2cmarketService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [CustomerEditComponent,
    VendorAddComponent,
    EmployeeAddComponent,
    B2bmarketAddComponent,
    B2ccustomerAddComponent,
    B2cmarketAddComponent,
    VendoorEditComponent,
    B2cmarketEditComponent,
    B2bmarketEditComponent,
    B2ccustomerEditComponent,
    AgentEditComponent,
    AgentAddComponent,
    CustomerAddComponent,
    EmployeeEditComponent,
    OtherCustomerComponent,
    OthersAddComponent,
    OthersEditComponent,
    InterB2cmarketEditComponent,
    InterB2cmarketAddComponent,
    InterB2ccustomerEditComponent,
    InterB2ccustomerAddComponent,
    InterB2bCustomerEditComponent,
    InterB2bCustomerAddComponent,
    InterB2bmarketAddComponent,
    InterB2bmarketEditComponent,
    MessageAddComponent,
    MessageEditComponent
  ]
})
export class AppModule { }

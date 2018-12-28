import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { HeaderSideComponent } from './shared/header-side/header-side.component';
import { CustomerManagementComponent } from './customer-management/customer-management/customer-management.component';
import { SmsManagementComponent } from './sms-management/sms-management/sms-management.component';
import { EmailManagementComponent } from './email-management/email-mangement/email-management.component';
import { UploadManagementComponent } from './upload-management/upload-management/upload-management.component';
import { B2cmarketManagementComponent } from './b2cmarket-management/b2cmarket-management/b2cmarket-management.component';
import { LoginComponent } from './user-management/login/login.component';
import { RegisterComponent } from './user-management/register/register.component';
import { AuthGuard } from './user-management/auth-guard.service';
import { PermissionComponent } from './user-management/permission/permission.component';
import { B2bmarketManagementComponent } from './b2bmarket-management/b2bmarket-management/b2bmarket-management.component';
import { B2ccustomerManagementComponent } from './b2ccustomer-management/b2ccustomer-management/b2ccustomer-management.component';
import { VendorManagementComponent } from './vendor-management/vendor-management/vendor-management.component';
import { EmployeeManagementComponent } from './employee.management/employee-management/employee-management.component';
import { BackupComponent } from './backup-management/backup/backup.component';
import {
    AgentManagementComponent
  } from './agent-management/agent-management/agent-management.component';
  import {
    OtherCustomerComponent
  } from './other-customer-management/other-customer/other-customer.component';
  import { Interb2bcustomerManagementComponent
  } from './interb2bcustomer-management/interb2bcustomer-management/interb2bcustomer-management.component';
 import { Interb2bmarketManagementComponent
  } from './interb2bmarket-management/interb2bmarket-management/interb2bmarket-management.component';
 import { Interb2ccustomerManagementComponent
  } from './interb2ccustomer-management/interb2ccustomer-management/interb2ccustomer-management.component';
 import { Interb2cmarketManagementComponent
  } from './interb2cmarket-management/interb2cmarket-management/interb2cmarket-management.component';
  import { MessageManagementComponent
  } from './message-management/message-management/message-management.component';
  import { InteruploadManagementComponent } from './interupload-management/interupload-management/interupload-management.component';
  import { AlertComponent } from './shared/alert/alert.component';
  import { ConfirmAlertComponent } from './shared/confirm-alert/confirm-alert.component';
  import { SmsReportComponent } from './sms-management/sms-report/sms-report.component';
  import { SmsReportViewComponent } from './sms-management/sms-report-view/sms-report-view.component';
  import { EmailImageComponent } from './email-management/email-image/email-image.component';
const routes: Routes = [
    {
        path: 'testing', component: NavHeaderComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    { path: 'permission', component: PermissionComponent},
    { path: 'register',  component: RegisterComponent },
    { path: 'alert',  component: AlertComponent },
    { path: 'confirmalert',  component: ConfirmAlertComponent },
    { path: 'smsview',  component: SmsReportViewComponent },
    {
        path: '', canActivate: [AuthGuard],
    children: [
        {
            path: 'headerside', canActivate: [AuthGuard], component: HeaderSideComponent,
          children: [
            { path: 'b2bcustomer', component: CustomerManagementComponent, canActivate: [AuthGuard] },
            { path: 'b2bmarket', component: B2bmarketManagementComponent, canActivate: [AuthGuard]
            },
            { path: 'b2ccustomer', component: B2ccustomerManagementComponent, canActivate: [AuthGuard]},
            { path: 'b2cmarket', component: B2cmarketManagementComponent,  canActivate: [AuthGuard] },
            { path: 'employee', component: EmployeeManagementComponent, canActivate: [AuthGuard] },
            { path: 'vendor',  component: VendorManagementComponent, canActivate: [AuthGuard] },
            { path: 'agent', component: AgentManagementComponent, canActivate: [AuthGuard] },
            { path: 'others', component: OtherCustomerComponent, canActivate: [AuthGuard]
            },
            { path: 'emailImage',  component: EmailImageComponent, canActivate: [AuthGuard] },
            { path: 'interb2bcustomer',  canActivate: [AuthGuard], component: Interb2bcustomerManagementComponent },
            { path: 'interb2bmarket',  canActivate: [AuthGuard], component: Interb2bmarketManagementComponent},
            { path: 'interb2ccustomer', canActivate: [AuthGuard], component: Interb2ccustomerManagementComponent},
            { path: 'interb2cmarket', canActivate: [AuthGuard],  component: Interb2cmarketManagementComponent, },
            { path: 'email', canActivate: [AuthGuard],  component: EmailManagementComponent},
            { path: 'sms', canActivate: [AuthGuard], component: SmsManagementComponent },
            { path: 'smsreport', canActivate: [AuthGuard], component: SmsReportComponent },
            { path: 'upload',  component: UploadManagementComponent, canActivate: [AuthGuard] },
            { path: 'interupload', component: InteruploadManagementComponent, canActivate: [AuthGuard]
            },
            { path: 'message', component: MessageManagementComponent, canActivate: [AuthGuard] },
            { path: 'permission', component: PermissionComponent, canActivate: [AuthGuard] },
            { path: 'register', canActivate: [AuthGuard], component: RegisterComponent },
            { path: 'backup',  canActivate: [AuthGuard], component: BackupComponent },
            ]
        }]
    },
   //  { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });

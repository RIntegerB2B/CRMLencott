
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import PerfectScrollbar from 'perfect-scrollbar';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { UserManagementService } from './../../user-management/user-management.service';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../user-management/auth.service';
import { Register } from '../../user-management/register/register.model';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html',
  styleUrls: ['./header-side.component.css']
})

export class HeaderSideComponent implements OnInit, OnDestroy {
  // private sidebarPS: PerfectScrollbar;
  menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  menuItemsSub: Subscription;
  mobileQuery: MediaQueryList;
  allowEdit: false;
  role: AccessPermission;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;
  showInternational = false;
  showSetting = false;
  /* smsCheck =
  {'status':'success',
  'mobilenumbers': '9965437973', 'remainingcredits': 24014, 'msgcount': 1, 'selectedRoute': 'transactional',
  'refid': -1664547636797540033,
  'senttime': '2018-10-17 09:36:56',
  'response': [{'mobile_number': '919965437973','unique_id':'5bc6b56075701'}]}; */

  private _mobileQueryListener: () => void;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  constructor(public headerSideService: HeaderSideService, private userManagementService: UserManagementService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private router: Router, public route: ActivatedRoute, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    /* const check = Object.keys(this.smsCheck).map(key => this.smsCheck[key]);
    console.log(check);
 */
  }

  ngOnInit() {
    this.role = JSON.parse(sessionStorage.getItem('role'));
    console.log(this.role);
    console.log('sample', this.role);
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.authService.logout();
  }
  logout() {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}

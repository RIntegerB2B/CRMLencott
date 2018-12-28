import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderSideService } from './shared/header-side/header-side.service';
import { AccessPermission } from './user-management/permission/accessPermission.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  role: AccessPermission;
  constructor(
    public headerSideService: HeaderSideService, private router: Router
  ) {
  }

  ngOnInit() {

  }
}

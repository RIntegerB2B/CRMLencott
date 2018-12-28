import { Component, OnInit, ViewChild } from '@angular/core';
import { NavHeaderService } from './nav-header.service';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { SmsService } from './../../sms-management/sms.service';
import { B2bMarket } from '../model/b2bmarket.model';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})

export class NavHeaderComponent implements OnInit {
  toggleMenuBar = 'colapseMenuBar';
  arrayBuffer: any;
  file: File;
  whatsappShareUrl: string;
  customers;
  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;
  clickedMobileNumber;
  allMobileNumber;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'customername', 'mobilenumber', 'email', 'location'];
  selection = new SelectionModel<B2bMarket>(true, []);
  dataSource: any = [];
  /* dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA); */
  constructor(public navHeaderService: NavHeaderService, private smsService: SmsService, private http: HttpClient) { }

  ngOnInit() {
    this.getAllAgent();
  }

  toggleMenu() {
    this.toggleMenuBar = this.toggleMenuBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  whatsApp() {
    this.whatsappShareUrl = 'https://api.whatsapp.com/send?phone=919965437973&text=welcome%20to%20CRM%20'
   /* + 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3021/' */;

    window.location.href = this.whatsappShareUrl;

  }

  getAllAgent() {
    this.smsService.allAgent()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<B2bMarket>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

/*   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log(numSelected);
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
 */
  /*  Upload() {
     const fileReader = new FileReader();
     fileReader.onload = (e) => {
       this.arrayBuffer = fileReader.result;
       const data = new Uint8Array(this.arrayBuffer);
       const arr = new Array();
       for (let i = 0; i !== data.length; ++i) {
         arr[i] = String.fromCharCode(data[i]);
       }
       const bstr = arr.join('');
       const workbook = XLSX.read(bstr, { type: 'binary' });
       const first_sheet_name = workbook.SheetNames[0];
       const worksheet = workbook.Sheets[first_sheet_name];
       this.customers = XLSX.utils.sheet_to_json(worksheet);
       this.navHeaderService.createCustomer(this.customers).subscribe(detail => {
         this.newCustomer = detail;
         console.log(detail);
       });
     };
     fileReader.readAsArrayBuffer(this.file);
   } */


  private findStartEndIndices(): {startIndex: number, endIndex: number} {
    const pageIndex = this.dataSource.paginator.pageIndex;
    const pageSize = this.dataSource.paginator.pageSize;
    const total = this.dataSource.paginator.length;
    const startIndex = pageIndex * pageSize;
    const endIndex = (startIndex + pageSize) > total ? total : startIndex + pageSize;
    return {startIndex: startIndex, endIndex: endIndex};
  }

  isAllSelected() {
    const page: {startIndex: number, endIndex: number}
    = this.findStartEndIndices();
    const sortedData = this.dataSource._orderData(this.dataSource.data);
    const numSelected = sortedData.slice(page.startIndex, page.endIndex)
      .filter( row => this.selection.isSelected(row)).length;

    return numSelected === (page.endIndex - page.startIndex);
  }

  isAtLeaseOneSelected() {
    if (this.dataSource.length === 0)     {
      console.log(this.dataSource.length);
    } else {
      const page: {startIndex: number, endIndex: number} =
      this.findStartEndIndices();
    const sortedData = this.dataSource._orderData(this.dataSource.data);
    const numSelected = sortedData.slice(page.startIndex, page.endIndex)
      .filter( row => this.selection.isSelected(row)).length;
    return numSelected > 0;
    }
  }

  masterToggle() {
    const page: {startIndex: number, endIndex: number} = this.findStartEndIndices();

    const sortedData = this.dataSource._orderData(this.dataSource.data);
    if (this.isAllSelected()) {
      sortedData.slice(page.startIndex, page.endIndex).forEach( row => {
        this.selection.deselect(row);
      });
      console.log(this.selection.selected);
    } else {
      sortedData.slice(page.startIndex, page.endIndex).forEach( row => {
          this.selection.select(row);
      });
     /*  this.map1 = this.selection.selected.map(x => x.mobileNumber);
      console.log(this.map1); */
    }
    this.newTest();
  }
newTest() {
  this.allMobileNumber = '';
  this.clickedMobileNumber = this.selection.selected.map(x => x.mobileNumber);
  console.log(this.clickedMobileNumber);
  for (let i = 0; i < this.clickedMobileNumber.length; i++)   {
    if (i === 0)     {
      this.allMobileNumber =  + this.clickedMobileNumber[i].slice(-10);
    }     else {
    const firstMobileNumber =  ',' + this.clickedMobileNumber[i].slice(-10);
    this.allMobileNumber += firstMobileNumber;
  }
  }
  console.log(this.allMobileNumber);
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  rowToggle(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    this.newTest();
  }
}


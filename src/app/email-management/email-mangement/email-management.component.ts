import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { EmailSend } from './email.model';
import { Customer } from '../../shared/model/customer.model';
import { EmailService } from '../email.service';
import { PageEvent } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { PaginationModel } from './pagination.model';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { ImagesUpload } from './image.model';
import { AlertService } from './../../shared/alert/alert.service';
@Component({
  selector: 'app-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.css']
})

export class EmailManagementComponent implements OnInit {
  @ViewChild('contentWrapper') content: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  messageTemplates = ['First Template'];
  clickedEmails;
  allEmails;
  selectedEmails = [];
  sendEmaillist;
  selectCheckbox = false;
  customerDetailsForm: FormGroup;
  htmlTemplate: any;
  subDescription: any;
  titleName: any;
  textHeader;
  textTemplate;
  isExpanded = true;
  showSubmenu = false;
  showInterNational = false;
  isShowing = false;
  emailMessage: any;
  newCustomer: any;
  array: any;
  dataSource: any = [];
  rows: any = [];
  columns: any = [];
  emailSend: EmailSend;
  temp: any = [];
  smsStatus: any = [];
  selectOneTemplate = false;
  selectSecondTemplate = false;
  role: AccessPermission;
  subjectImage;
  imageAll: ImagesUpload;

  nationalDatabse = [{ 'type': 'B2B CUSTOMER DB' },
  { 'type': 'B2B MARKET DB' }, { 'type': 'B2C CUSTOMER DB' }, { 'type': 'B2C MARKET DB' },
  { 'type': 'EMPLOYEE DB' }, { 'type': 'VENDOR DB' }, { 'type': 'AGENT DB' },
  { 'type': 'OTHERS DB' }];
  interNationalDatabse = [{ 'type': 'B2B CUSTOMER DB' },
  { 'type': 'B2B MARKET DB' }, { 'type': 'B2C CUSTOMER DB' }, { 'type': 'B2C MARKET DB' }];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchString: string;
  showEmailMessage = false;
  displayedColumns: string[] = ['select', 'customername', 'email', 'mobilenumber', 'location'];
  selection = new SelectionModel<PaginationModel>(true, []);


  constructor(private fb: FormBuilder,
    private emailService: EmailService, private alertService: AlertService,
    private headerSideService: HeaderSideService
  ) { }

  ngOnInit() {
    this.createForm();
    this.role = JSON.parse(sessionStorage.getItem('role'));
    this.getAllImages();
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      _id: [],
      emailMessage: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      designation: [],
      location: [],
      message: [],
      subjectTitle: [],
      subjectBody: [],
      subjectSecondBody: [],
      subjectImage: [],
      subjectFooter: []
    });
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
  getImage() {
    this.textTemplate = 'Image';
    this.selectOneTemplate = false;
    this.selectSecondTemplate = true;
    this.customerDetailsForm.reset();
  }
  getText() {
    this.textTemplate = 'Template';
    this.selectOneTemplate = true;
    this.selectSecondTemplate = false;
    this.customerDetailsForm.reset();
  }
  setMailImage(e, imageData) {
    if (e.checked === true) {
      this.subjectImage = imageData;
    } else {
      this.subjectImage = '';
    }
  }
  // get B2B Customer //
  /* getAllB2bCustomer() {
    this.textHeader = this.nationalDatabse[0].type;
    this.emailService.allB2bCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.newCustomer = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllB2bMarket() {
    this.textHeader = this.nationalDatabse[1].type;
    this.emailService.allB2bMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.newCustomer = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllB2cCustomer() {
    this.textHeader = this.nationalDatabse[2].type;
    this.emailService.allB2cCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.newCustomer = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  } */
  // get B2C Market //
  /*  getAllB2cMarket() {
     this.textHeader = this.nationalDatabse[3].type;
     this.emailService.allB2cMarket()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllEmployee() {
     this.textHeader = this.nationalDatabse[4].type;
     this.emailService.allEmployee()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllVendor() {
     this.textHeader = this.nationalDatabse[5].type;
     this.emailService.allVendor()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllAgent() {
     this.textHeader = this.nationalDatabse[6].type;
     this.emailService.allAgent()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllOthers() {
     this.textHeader = this.nationalDatabse[7].type;
     this.emailService.allOthers()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllInterB2bcustomer() {
     this.textHeader = 'INTERNATIONAL B2B CUSTOMER';
     this.emailService.allInterB2bcustomer()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllInterB2bMarket() {
     this.textHeader = 'INTERNATIONAL B2B MARKET';
     this.emailService.allInterB2bMarket()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllInterB2cCustomer() {
     this.textHeader = 'INTERNATIONAL B2C CUSTOMER';
     this.emailService.allInterB2cCustomer()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   }
   getAllInterB2cMarket() {
     this.textHeader = 'INTERNATIONAL B2C MARKET';
     this.emailService.allInterB2cMarket()
       .subscribe((response) => {
         this.dataSource = new MatTableDataSource<Element>(response);
         this.dataSource.paginator = this.paginator;
         this.array = response;
         this.totalSize = this.array.length;
         this.newCustomer = response;
         this.temp = response;
         this.iterator();
       }, error => {
         console.log(error);
       });
   } */
  getAllImages() {
    this.emailService.findAllImage().subscribe(data => {
      this.imageAll = data;
      console.log(this.imageAll);
    }, error => {
      console.log(error);
    });
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
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
    console.log(this.dataSource);
  }

  sendEmail(customerDetailsForm: FormGroup) {
    this.customerDetailsForm.controls.email.setValue(this.allEmails);
    console.log(this.selectedEmails);
    this.htmlTemplate = this.content.nativeElement.innerHTML;
    this.customerDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
    this.emailSend = new EmailSend(
      customerDetailsForm.controls.email.value,
      customerDetailsForm.controls.emailMessage.value,
      customerDetailsForm.controls.subjectTitle.value
    );
    this.emailService.emailSender(this.emailSend).subscribe(data => {
      console.log(data);
      this.alertService.confirm({
        message: 'Email Status:  Successfully'
      });
    }, error => {
      console.log(error);
    });
  }

  selectedEmail(e, value) {
    if (e.checked) {
      this.selectedEmails.push(value);
    } else {
      const updateItem = this.selectedEmails.find(this.findIndexToUpdate, value);

      const index = this.selectedEmails.indexOf(updateItem);

      this.selectedEmails.splice(index, 1);
    }
    console.log(this.selectedEmails);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
  selectedTemplate(e) {
    if (e.checked === true) {
      this.htmlTemplate = this.content.nativeElement.innerHTML;
      this.customerDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
      console.log(this.htmlTemplate);
    } else {
      this.customerDetailsForm.controls.emailMessage.reset();
    }
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const filterCustomer = Object.keys(this.temp[0]);
    filterCustomer.splice(filterCustomer.length - 1);
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
    this.dataSource = rows;
  }
  private findStartEndIndices(): { startIndex: number, endIndex: number } {
    const pageIndex = this.dataSource.paginator.pageIndex;
    const pageSize = this.dataSource.paginator.pageSize;
    const total = this.dataSource.paginator.length;
    const startIndex = pageIndex * pageSize;
    const endIndex = (startIndex + pageSize) > total ? total : startIndex + pageSize;
    return { startIndex: startIndex, endIndex: endIndex };
  }

  isAllSelected() {
    const page: { startIndex: number, endIndex: number }
      = this.findStartEndIndices();
    const sortedData = this.dataSource._orderData(this.dataSource.data);
    const numSelected = sortedData.slice(page.startIndex, page.endIndex)
      .filter(row => this.selection.isSelected(row)).length;

    return numSelected === (page.endIndex - page.startIndex);
  }

  isAtLeaseOneSelected() {
    if (this.dataSource.length === 0) {
      console.log(this.dataSource.length);
    } else {
      const page: { startIndex: number, endIndex: number } =
        this.findStartEndIndices();
      const sortedData = this.dataSource._orderData(this.dataSource.data);
      const numSelected = sortedData.slice(page.startIndex, page.endIndex)
        .filter(row => this.selection.isSelected(row)).length;
      return numSelected > 0;
    }
  }

  masterToggle() {
    const page: { startIndex: number, endIndex: number } = this.findStartEndIndices();

    const sortedData = this.dataSource._orderData(this.dataSource.data);
    if (this.isAllSelected()) {
      sortedData.slice(page.startIndex, page.endIndex).forEach(row => {
        this.selection.deselect(row);
      });
      console.log(this.selection.selected);
    } else {
      sortedData.slice(page.startIndex, page.endIndex).forEach(row => {
        this.selection.select(row);
      });
      /*  this.map1 = this.selection.selected.map(x => x.mobileNumber);
       console.log(this.map1); */
    }
    this.newEmails();
  }
  newEmails() {
    this.allEmails = '';
    this.clickedEmails = this.selection.selected.map(x => x.email);
    console.log(this.clickedEmails);
    for (let i = 0; i < this.clickedEmails.length; i++) {
      if (i === 0) {
        this.allEmails = this.clickedEmails[i];
      } else {
        const firstEmails = ',' + this.clickedEmails[i];
        this.allEmails += firstEmails;
      }
    }
    console.log(this.allEmails);
    this.customerDetailsForm.controls.email.setValue(this.allEmails);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  rowToggle(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    this.newEmails();
  }

  getAllB2bCustomer() {
    this.selection.clear();
    this.textHeader = this.nationalDatabse[0].type;
    this.emailService.allB2bCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  getAllB2bMarket() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = this.nationalDatabse[1].type;
    this.emailService.allB2bMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  getAllB2cCustomer() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = this.nationalDatabse[2].type;
    this.emailService.allB2cCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  getAllB2cMarket() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = this.nationalDatabse[3].type;
    this.emailService.allB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllEmployee() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = this.nationalDatabse[4].type;
    this.emailService.allEmployee()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllVendor() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = this.nationalDatabse[5].type;
    this.emailService.allVendor()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllAgent() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = this.nationalDatabse[6].type;
    this.emailService.allAgent()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllOthers() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = this.nationalDatabse[7].type;
    this.emailService.allOthers()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  getAllInterB2bcustomer() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = 'INTERNATIONAL B2B CUSTOMER';
    this.emailService.allInterB2bcustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  getAllInterB2bMarket() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = 'INTERNATIONAL B2B MARKET';
    this.emailService.allInterB2bMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllInterB2cCustomer() {
    this.customerDetailsForm.reset();
    this.selection.clear();
    this.textHeader = 'INTERNATIONAL B2C CUSTOMER';
    this.emailService.allInterB2cCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllInterB2cMarket() {
    this.selection.clear();
    this.customerDetailsForm.reset();
    this.textHeader = 'INTERNATIONAL B2C MARKET';
    this.emailService.allInterB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
}



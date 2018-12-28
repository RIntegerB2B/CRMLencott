import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MobileSend } from './sms-model';
import { SmsSelect } from './smsSelect.model';
import { MatStepper } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
/* import { Customer } from './../../shared/model/customer.model'; */
import { PaginationModel } from './pagination.model';
import { B2cCustomer } from './../../shared/model/b2ccustomer.model';
import { SmsService } from './../sms.service';
import { Message } from './../../shared/model/message.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { MessageService } from '../../message-management/message.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { AlertService } from './../../shared/alert/alert.service';

@Component({
  selector: 'app-sms-management',
  templateUrl: './sms-management.component.html',
  styleUrls: ['./sms-management.component.css']
})
export class SmsManagementComponent implements OnInit {
  @ViewChild('billNumber') billNumber: ElementRef;
  @ViewChild('billTotal') billTotal: ElementRef;
  @ViewChild('llrNumber') llrNumber: ElementRef;
  @ViewChild('dateLlr') dateLlr: ElementRef;
  @ViewChild('transp') transp: ElementRef;
  @ViewChild('billDate') billDate: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clickedMobileNumber;
  allMobileNumber;
  displayedColumns: string[] = ['select', 'customername', 'mobilenumber', 'email', 'location'];
  selection = new SelectionModel<PaginationModel>(true, []);
  dataSource: any = [];
  smsDetailsForm: FormGroup;
  smsCompleted = false;
  mobileSend: MobileSend;
  newCustomer: B2cCustomer[];
  newValue: B2cCustomer;
  selectedMobileNumbers = [];
  sendMobileNumber;
  textHeader;
  smsRespone;
  selectCheckbox = false;
  selectTemplate: boolean;
  mobiles;
  isExpanded = true;
  showSubmenu = false;
  showInterNational = false;
  isShowing = false;
  showMobileNumber = false;
  showPrimaryNumber = false;
  showMessage = false;
  showBillDetails = false;
  showLlrDetails = false;
  messages = [];
  isChecked: any;
  newMessage: Message[];
  setFullBillDetails;
  setFullLlrDetails: string;
  array: any;
  /* displayedColumns = ['', '', '', '', ''];
  dataSource: any = []; */
  rows: any = [];
  columns: any = [];
  temp: any = [];
  role: AccessPermission;
  smsResponeSuccess: any;
  selectedCustomerData;
  // pageEvent: PageEvent;
  /* messageTemplate = [{
    title: 'Thanks for visiting Rudramma. "We wish to see you again". Hope you had a pleasant experience with us'
  }, {
    title: 'Thanks for Purchasing  your valuable order. The goods will be dispatched at the earliest'
  }, {
    title: 'Thanks for purchasing with Rudramma. It was pleasure having you at our store. The goods will be dispatched at the earliest'
  }]; */
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
  /* smsRepsone = {  body: {'status':'success', 'mobilenumbers': '9965437973',
  'remainingcredits': 3809, 'msgcount': 1, 'selectedRoute': 'transactional',
  'refid': -3178967485238437313, 'senttime': '2018-11-25 14:11:37',
  'response': [ {'mobile_number': '919965437973', 'unique_id': '5bfa604167fee'}]},
  statusCode: 200};
   */
  constructor(private fb: FormBuilder, private smsService: SmsService, private headerSideService: HeaderSideService,
    private alertService: AlertService,
    private messageService: MessageService) {
  }


  ngOnInit() {
    this.createMessageForm();
    this.getAllMessage();
    this.role = JSON.parse(sessionStorage.getItem('role'));
    this.getAllB2bCustomer();
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
  createMessageForm() {
    this.smsDetailsForm = this.fb.group({
      smsBody: ['', Validators.compose([Validators.required, Validators.minLength(3),
      Validators.maxLength(155)])],
      billNo: [],
      billDate: [],
      billAmount: [],
      mobileNumber: [],
      smsHeader: ['', Validators.maxLength(6)],
      smsType: [''],
      llrNo: [],
      transporter: [],
      dateOfLlr: []
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
  getAllMessage() {
    this.messageService.allMessage().subscribe(data => {
      this.newMessage = data;
      console.log(this.newMessage);
    }, error => {
      console.log(error);
    });
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
    this.newTest();
  }
  newTest() {
    this.allMobileNumber = '';
    this.clickedMobileNumber = this.selection.selected.map(x => x.mobileNumber);
    console.log(this.clickedMobileNumber);
    for (let i = 0; i < this.clickedMobileNumber.length; i++) {
        if (i === 0) {
          this.allMobileNumber = + this.clickedMobileNumber[i].slice(-10);
        } else {
          const firstMobileNumber = ',' + this.clickedMobileNumber[i].slice(-10);
          this.allMobileNumber += firstMobileNumber;
        }
    }
    console.log(this.allMobileNumber);
    this.smsDetailsForm.controls.mobileNumber.setValue(this.allMobileNumber);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  rowToggle(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    this.newTest();
  }
  // get B2B Customer //
  /* getAllB2bCustomer() {
    this.textHeader = this.nationalDatabse[0].type;
    this.smsService.allB2bCustomer()
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
  getAllB2bCustomer() {
    this.selection.clear();
    this.textHeader = this.nationalDatabse[0].type;
    this.smsService.allB2bCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  /* getAllB2bMarket() {
    this.textHeader = this.nationalDatabse[1].type;
    this.smsService.allB2bMarket()
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
  getAllB2bMarket() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = this.nationalDatabse[1].type;
    this.smsService.allB2bMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  /* getAllB2cCustomer() {
    this.textHeader = this.nationalDatabse[2].type;
    this.smsService.allB2cCustomer()
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
  getAllB2cCustomer() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = this.nationalDatabse[2].type;
    this.smsService.allB2cCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  // get B2C Market //
  /* getAllB2cMarket() {
    this.textHeader = this.nationalDatabse[3].type;
    this.smsService.allB2cMarket()
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
  getAllB2cMarket() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = this.nationalDatabse[3].type;
    this.smsService.allB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  /* getAllEmployee() {
    this.textHeader = this.nationalDatabse[4].type;
    this.smsService.allEmployee()
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
  getAllEmployee() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = this.nationalDatabse[4].type;
    this.smsService.allEmployee()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllVendor() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = this.nationalDatabse[5].type;
    /*  this.smsService.allVendor()
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
       }); */
    this.smsService.allVendor()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllAgent() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = this.nationalDatabse[6].type;
    this.smsService.allAgent()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  getAllOthers() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = this.nationalDatabse[7].type;
    /*  this.smsService.allOthers()
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
       }); */
    this.smsService.allOthers()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  /* getAllInterB2bcustomer() {
    this.textHeader = 'INTERNATIONAL B2B CUSTOMER';
    this.smsService.allInterB2bcustomer()
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
  getAllInterB2bcustomer() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = 'INTERNATIONAL B2B CUSTOMER';
    this.smsService.allInterB2bcustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  /* getAllInterB2bMarket() {
    this.textHeader = 'INTERNATIONAL B2B MARKET';
    this.smsService.allInterB2bMarket()
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
  getAllInterB2bMarket() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = 'INTERNATIONAL B2B MARKET';
    this.smsService.allInterB2bMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
  /* getAllInterB2cCustomer() {
    this.textHeader = 'INTERNATIONAL B2C CUSTOMER';
    this.smsService.allInterB2cCustomer()
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
  getAllInterB2cCustomer() {
    this.smsDetailsForm.reset();
    this.selection.clear();
    this.textHeader = 'INTERNATIONAL B2C CUSTOMER';
    this.smsService.allInterB2cCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }
 /*  getAllInterB2cMarket() {
    this.textHeader = 'INTERNATIONAL B2C MARKET';
    this.smsService.allInterB2cMarket()
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
  } */ getAllInterB2cMarket() {
    this.selection.clear();
    this.smsDetailsForm.reset();
    this.textHeader = 'INTERNATIONAL B2C MARKET';
    this.smsService.allInterB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<PaginationModel>(response);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  /* handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  } */

  sendSms(smsDetailsForm: FormGroup) {
    console.log(smsDetailsForm);
    if (
      smsDetailsForm.controls.mobileNumber.value === null
      || smsDetailsForm.controls.mobileNumber.value === '') {
      this.showMobileNumber = true;
      this.showMessage = false;
    } else {
      if (smsDetailsForm.controls.smsBody.value === '') {
        this.showMessage = true;
        this.showMobileNumber = false;
      } else {
        this.showMessage = false;
        this.showMobileNumber = false;
        this.mobileSend = new MobileSend(
          smsDetailsForm.controls.mobileNumber.value,
          smsDetailsForm.controls.smsBody.value,
          smsDetailsForm.controls.smsHeader.value,
          smsDetailsForm.controls.smsType.value
        );
        this.smsService.mobileMessage(this.mobileSend).subscribe(data => {
          console.log(data);
          this.smsRespone = data;
          this.alertService.confirm({
            message: 'SMS Status:  ' +
              this.smsRespone.smsStatus
          });
          smsDetailsForm.reset();
        }, error => {
          this.alertService.confirm({ message: 'Server Down. Please try again' });
          smsDetailsForm.reset();
          console.log(error);
        });
      }
    }
  }

  /* selectedMobileNumber(e, mobileData) {
    if (e.checked) {
      if (mobileData.length > 10) {
        const lengthOf = mobileData.length - 10;
        const newValue = mobileData.substr(lengthOf);
        this.selectedMobileNumbers.push(mobileData);
      } else {
        this.selectedMobileNumbers.push(mobileData);
      }
    } else {
      const updateItem = this.selectedMobileNumbers.find(this.findIndexToUpdate, mobileData);

      const index = this.selectedMobileNumbers.indexOf(updateItem);

      this.selectedMobileNumbers.splice(index, 1);
    }
    this.sendMobileNumber = this.selectedMobileNumbers.toString();
    this.smsDetailsForm.controls.mobileNumber.setValue(this.sendMobileNumber);
    console.log(this.selectedMobileNumbers);
  }
  findIndexToUpdate(mobileData) {
    return mobileData === this;
  }
  selectAllMobileNumber(e, dataSource) {
    if (e.checked === true)     {
      this.selectCheckbox = !this.selectCheckbox;
      dataSource.forEach(element => {
        this.selChk(element.mobileNumber);
      });
    } else {
      this.selectCheckbox = false;
    }
    console.log(this.selectedMobileNumbers);
  }
  selChk(val) {
    const index = this.selectedMobileNumbers.indexOf(val);
    if (index === -1) {
      // val not found, pushing onto array
      this.selectedMobileNumbers.push(val);
    } else {
      // val is found, removing from array
      this.selectedMobileNumbers.splice(index, 1);
    }
   } */
  getBillDetails() {
    if (this.smsDetailsForm.controls.mobileNumber.value === null ||
      this.smsDetailsForm.controls.mobileNumber.value === '') {
      this.showPrimaryNumber = true;
    } else {
      if (this.billNumber.nativeElement.value === '' ||
        this.billTotal.nativeElement.value === '' ||
        this.billDate.nativeElement.value === ''
      ) {
        this.showBillDetails = true;
        this.showPrimaryNumber = false;
      } else {
        this.showBillDetails = false;
        this.showPrimaryNumber = false;
        this.showMobileNumber = false;
        this.setFullBillDetails = 'Bill Number: ' + this.billNumber.nativeElement.value
          + '\nBill Amount: ' + this.billTotal.nativeElement.value + '\nBill Date: ' + this.billDate.nativeElement.value;
        this.smsDetailsForm.controls.smsBody.setValue(this.setFullBillDetails);
        const inSms = ',9845263436,9880039896,9108329309';
        this.sendMobileNumber = this.smsDetailsForm.controls.mobileNumber.value + inSms;
        this.smsDetailsForm.controls.mobileNumber.setValue(this.sendMobileNumber);
        console.log('all', this.allMobileNumber);
        this.smsDetailsForm.controls.billDate.reset();
        this.smsDetailsForm.controls.billNo.reset();
        this.smsDetailsForm.controls.billAmount.reset();
      }
    }
  }
  getLlrDetails() {
    if (this.smsDetailsForm.controls.mobileNumber.value === null || this.smsDetailsForm.controls.mobileNumber.value === '') {
      this.showPrimaryNumber = true;
    } else {
      if (this.llrNumber.nativeElement.value === '' ||
        this.dateLlr.nativeElement.value === '' ||
        this.transp.nativeElement.value === ''
      ) {
        this.showLlrDetails = true;
      } else {
        this.showLlrDetails = false;
        this.showPrimaryNumber = false;
        this.showMobileNumber = false;
        this.setFullLlrDetails = 'Your LLR No: ' + this.llrNumber.nativeElement.value
          + ' goods is dispatched ' + this.transp.nativeElement.value + 'on' +
          this.dateLlr.nativeElement.value + 'Thank you for purchase';
        this.smsDetailsForm.controls.smsBody.setValue(this.setFullLlrDetails);
        const inSms = ',9845263436,9880039896,9108329309';
        this.sendMobileNumber = this.smsDetailsForm.controls.mobileNumber.value + inSms;
        this.smsDetailsForm.controls.mobileNumber.setValue(this.sendMobileNumber);
        this.smsDetailsForm.controls.llrNo.reset();
        this.smsDetailsForm.controls.dateOfLlr.reset();
        this.smsDetailsForm.controls.transporter.reset();
      }
    }
  }
  setMessageTemplate(e, title) {
    if (e.checked !== true ||
      this.smsDetailsForm.controls.mobileNumber.value === null ||
      this.smsDetailsForm.controls.mobileNumber.value === ''
    ) {
      this.showPrimaryNumber = true;
    } else {
      this.showPrimaryNumber = false;
      this.showMobileNumber = false;
      this.sendMobileNumber = this.smsDetailsForm.controls.mobileNumber.value;
      this.smsDetailsForm.controls.smsBody.setValue(title);
      this.smsDetailsForm.controls.mobileNumber.setValue(this.allMobileNumber);
      this.smsDetailsForm.controls.smsType.setValue('staticMessage');
    }
  }
  setNameValue(e, template) {
    if (e.checked === true) {
      this.smsDetailsForm.controls.smsBody.setValue(template);
    } else {
      this.smsDetailsForm.controls.smsBody.reset();
    }
  }
  /* updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const filterCustomer = Object.keys(this.temp[0]);
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
    this.dataSource = rows;
  } */
}

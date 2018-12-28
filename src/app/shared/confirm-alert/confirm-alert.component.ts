/* import { Component, OnInit, Inject, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ConfirmAlertBox } from './confirmAlert.model';
@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.css']
})
export class ConfirmAlertComponent implements OnInit {
  @Input() confirmAlertBox: ConfirmAlertBox;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  closeModal()   {
    this.confirmAlertBox.displayClass = 'displayNone';
  }
  deleteMessage()   {
    this.confirmAlertBox.displayClass = 'displayNone';
    this.messageEvent.emit('Yes');
  }
    notDeleteMessage()   {
      this.confirmAlertBox.displayClass = 'displayNone';
      this.messageEvent.emit('No');
  }
}
 */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, Input } from '@angular/core';
import { ConfirmAlertBox } from './confirmAlert.model';
@Component({
  selector: 'app-confirm',
  template: `<h1 matDialogTitle>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
    <button
    type="button"
    mat-raised-button
    color="primary"
    (click)="dialogRef.close(true)">Yes</button>
    &nbsp;
    <span fxFlex></span>
    <button
    type="button"
    color="warn"
    mat-raised-button
    (click)="dialogRef.close(false)">No</button>
    </div>`,
})
export class ConfirmAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

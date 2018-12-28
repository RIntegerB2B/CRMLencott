/* import { Component, OnInit, Input } from '@angular/core';
import { AlertBox } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alertBox: AlertBox;

  constructor() { }

  ngOnInit() {
  }
  closeModal()   {
    this.alertBox.displayClass = 'displayNone';
  }
}
 */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<h1 matDialogTitle>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
    &nbsp;
    <span fxFlex></span>
    <button
    type="button"
    color="warn"
    mat-raised-button
    (click)="dialogRef.close(false)">Cancel</button>
    </div>`,
})
export class AlertComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

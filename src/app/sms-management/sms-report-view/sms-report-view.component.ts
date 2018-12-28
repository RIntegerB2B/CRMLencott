import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sms-report-view',
  templateUrl: './sms-report-view.component.html',
  styleUrls: ['./sms-report-view.component.css']
})
export class SmsReportViewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SmsReportViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

}

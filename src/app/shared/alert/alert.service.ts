import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { AlertComponent } from './alert.component';

interface ConfirmData {
  title?: string;
  message?: string;
}

@Injectable()
export class AlertService {

  constructor(private dialog: MatDialog) { }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || 'Information';
    data.message = data.message;
    let dialogRef: MatDialogRef<AlertComponent>;
    dialogRef = this.dialog.open(AlertComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}

import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { ConfirmAlertComponent } from './confirm-alert.component';

interface DeleteData {
  title?: string;
  message?: string;
}

@Injectable()
export class ConfirmAlertService {

  constructor(private dialog: MatDialog) { }

  public confirm(data: DeleteData = {}): Observable<boolean> {
    data.title = data.title || 'Delete';
    data.message = data.message || 'Are you sure?';
    let dialogRef: MatDialogRef<ConfirmAlertComponent>;
    dialogRef = this.dialog.open(ConfirmAlertComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}

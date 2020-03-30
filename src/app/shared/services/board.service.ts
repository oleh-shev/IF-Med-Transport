import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { }

  modalDialog(modalWindow, data, callback: Function ): void {
    const dialogRef = this.dialog.open(modalWindow, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback(result);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  /** hander for httpErrorResponce */
  error = (err: HttpErrorResponse) => {
    this.openSnackBar(err.error.detail);
  } 
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FutureTrip } from 'src/app/shared/entity.interface';

@Injectable({
  providedIn: 'root'
})
export class PassBoardService {
 
  constructor(public dialog: MatDialog) { }
  
  // create modal window for reserved places
  reserveDialog(modalWindow, data: FutureTrip, callback: Function ): void {
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
}

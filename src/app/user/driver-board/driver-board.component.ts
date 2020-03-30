import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-driver-board',
  templateUrl: './driver-board.component.html',
  styleUrls: ['./driver-board.component.scss']
})
export class DriverBoardComponent implements OnInit {
  driverTrips = [];

  constructor(
    private apiservice: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getUserTrips();
  }

  private getUserTrips() {
    this.apiservice.getUserTrips().subscribe((res:any) => {
      console.log(res.results);
      const results =  res.results;
      results.forEach( item => {
        this.getTripWithReservation(item.id);
      });
    }, (err:  any) => {
      this.openSnackBar(err.messages.message);
    });
  }

  private getTripWithReservation (id: string) {
    this.apiservice.getTripById(id).subscribe((res:any) => {
      console.log(res);
      this.driverTrips.push(res);
    }, (err:  any) => {
      this.openSnackBar(err.messages.message);
    });
  }

  changeViewDetailTrip(event) {
    let target = event.target;
    let outerBox: HTMLElement = target.closest('.list');
    if (outerBox) {
      let detailBox = outerBox.getElementsByClassName('list__detailTrip').item(0);
      detailBox.classList.toggle('visable');
      if (detailBox.classList.contains('visable')) {
        target.innerText = 'Приховати';
      } else {
        target.innerText = 'Детально';
      }
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

}

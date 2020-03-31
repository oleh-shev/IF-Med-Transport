import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { BoardService } from '../../shared/services/board.service'
import { DriverBoardConfirmComponent } from './driver-board-confirm/driver-board-confirm.component';
import { forkJoin, Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-driver-board',
  templateUrl: './driver-board.component.html',
  styleUrls: ['./driver-board.component.scss']
})
export class DriverBoardComponent implements OnInit {
  driverTrips = [];
  filterDriverTrips = [];
  subscription: any;
  isLogged: boolean;
  stateTrip = ['Active', 'Compleate', 'Canceled']

  constructor(
    private apiservice: ApiService,
    public boardService: BoardService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged = this.authService.isTokenAvailable();
    this.subscription = this.authService.isUserLogged().subscribe(data => {
      this.isLogged = data;
    });
    (() => {
      if (this.isLogged) {
        this.getUserTrips();
      }
    })();
  }

  private getUserTrips() {
    this.apiservice.getUserTrips().subscribe((res:any) => {
      console.log(res.results);
      const results =  res.results;
      this.getTripWithReservation(results).subscribe( (res: any) => {
        console.log(res);
        this.driverTrips = res;
        this.filterDriverTrips = this.driverTrips;
      }, this.boardService.error);
    }, this.boardService.error);
  }

  private getTripWithReservation (trips: []): Observable<any> {
    return forkJoin(
      trips.map((trip: any) => {
        return this.apiservice.getTripById(trip.id);
      })
    )
  }

  acceptTripByDriver(id: string, payload) {
    this.apiservice.acceptTrip(id, payload).subscribe( (res: any) => {
      this.getUserTrips()
    }, this.boardService.error);
  }

  rejectTripByDriver(id: string, payload) {
    this.apiservice.rejectTrip(id, payload).subscribe( (res: any) => {
      this.getUserTrips()
    }, this.boardService.error);
  }

  cancelTripByDriver(id: string) {
    this.apiservice.cancelTripByDriver(id, {}).subscribe( (res: any) => {
      this.getUserTrips()
    }, this.boardService.error);
  }

  cancelTrip(id: string) {
    this.apiservice.cancelTrip(id, {}).subscribe( (res: any) => {
      this.getUserTrips()
    }, this.boardService.error);
  }

  completeTrip(id: string) {
    this.apiservice.completeTrip(id, {}).subscribe( (res: any) => {
      this.getUserTrips()
    }, this.boardService.error);
  }

  changeViewDetailTrip(event) {
    let target = event.target;
    let outerBox: HTMLElement = target.closest('.listbox');
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

      /** Confirm reservation */
  openConfirmDialog(id: string, title: string, action: string, state: boolean): void {
    const data = {id, title, action, state};
    console.log(data);
    this.boardService.modalDialog(DriverBoardConfirmComponent, data, (res: any) => this.confirmReservation(res));
  }

  private confirmReservation(res: any) {
    const {id, state, ...payload} = res;
    console.log(payload);
    if (state) {
      this.apiservice.acceptTrip(id, payload).subscribe( (res: any) => {
        this.getUserTrips();
      }, this.boardService.error);
    } else {
      this.apiservice.rejectTrip(id, payload).subscribe( (res: any) => {
        this.getUserTrips();
      }, this.boardService.error );
    }
  }

  filteringDriverTrips(condition: String[]) {
    this.filterDriverTrips = this.driverTrips.filter( item => {
      return condition.includes(item.state);
    });
  }

}

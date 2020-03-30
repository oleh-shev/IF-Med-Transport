import { Component, OnInit } from '@angular/core';
import { FutureTrip, Location, SubLocation, User } from '../../shared/entity.interface';
import { ApiService } from '../../shared/services/api.service';
import { mergeMap, map, } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PassBoardService } from './pass-board.service';
import { PassBoardReserveComponent } from './pass-board-reserve/pass-board-reserve.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pass-board',
  templateUrl: './pass-board.component.html',
  styleUrls: ['./pass-board.component.scss']
})
export class PassBoardComponent implements OnInit {
  futureActiveTrips: FutureTrip[] = [];
  filteredFutureActiveTrips: FutureTrip[] = [];
  userReservationTrips = [];
  filteredUserReservationTrips = [];
  passenger: User;
  listLocationTo: SubLocation[] = [];
  listSubLocationTo: SubLocation[] = [];
  listLocationFrom: SubLocation[] = [];
  listSubLocationFrom: SubLocation[] = [];
  listLocations: Location[] = [];
  searchForm: FormGroup;
  stateTrip = [ 'Pending', 'Accepted', 'Rejected', 'Canceled By Passenger', 'Canceled By Driver', 'Trip Canceled']

  constructor(
    private apiservice: ApiService,
    private fb: FormBuilder,
    public passBoardService: PassBoardService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.getFutureActiveTripsWithLocations();
    this.getUserReservations()
    this.getInfoAboutMe();
    this.createFormForSearchTrip();
    this.onChangeFieldsSearchForm();
  }

  private createFormForSearchTrip() {
    this.searchForm = this.fb.group({
      to_location: [''],
      to_sublocation: [''],
      from_location: [''],
      from_sublocation: [''],
    });
  }

  private getFutureActiveTripsWithLocations() {
    this.apiservice.getFutureActiveTrips()
    .subscribe( (res: any) => {
        this.futureActiveTrips = res.results.filter( item => !item.current_user_has_reservation);
        console.log(this.futureActiveTrips);
        this.filteredFutureActiveTrips =  this.futureActiveTrips;
        this.setLocations();
    }, (err: any) => {
      this.openSnackBar(err.messages.message);
    });
  }

  /** set all location properties */
  private setLocations () {
    this.listLocationFrom = this.getLocations(this.filteredFutureActiveTrips, 'from_location_1');
    this.listLocationTo = this.getLocations(this.filteredFutureActiveTrips, 'to_location_1');
    this.listSubLocationFrom = this.getLocations(this.filteredFutureActiveTrips, 'from_location_2');
    this.listSubLocationTo = this.getLocations(this.filteredFutureActiveTrips, 'to_location_2');
  }

  private getInfoAboutMe() {
    this.apiservice.getInfoAboutMe()
    .subscribe( (res: any) => {
      this.passenger = res;
    }, (err: any) => {
      this.openSnackBar(err.messages.message);
    });
  }

  private getUserReservations() {
    this.apiservice.getUserReservations()
      .subscribe( (res: any) => {
          console.log(res.results);
          this.userReservationTrips = res.results;
          this.filteredUserReservationTrips = this.userReservationTrips;
      }, (err: any) => {
        this.openSnackBar(err.messages.message);
      });
  }

  // private getLocations() {
  //   this.apiservice.getLocations()
  //   .subscribe(res => {
  //     this.listLocations = res.results;
  //   });
  // }

  changeViewDetailTrip(event) {
    let target = event.target;
    let outerBox: HTMLElement = target.closest('.list');
    if (outerBox) {
      let detailBox = outerBox.getElementsByClassName('list__detailTrip').item(0);
      //parentElement.previousElementSibling;
      detailBox.classList.toggle('visable');
      if (detailBox.classList.contains('visable')) {
        target.innerText = 'Приховати';
      } else {
        target.innerText = 'Детально';
      }
    }
  }

    /** handler for change fields searchForm */
    private onChangeFieldsSearchForm() {
      this.searchForm.valueChanges.subscribe(value => {
        if (value.from_location) {
          this.filteredFutureActiveTrips = this.filteredFutureActiveTrips
            .filter(item => item.from_location_1.id == value.from_location);
        }
        if (value.from_sublocation) {
          this.filteredFutureActiveTrips = this.filteredFutureActiveTrips
            .filter(item => item.from_location_2.id == value.from_location);
        }
        if (value.to_location) {
          this.filteredFutureActiveTrips = this.filteredFutureActiveTrips
          .filter(item => item.to_location_1.id == value.to_location);
        }
        if (value.to_sublocation) {
          this.filteredFutureActiveTrips = this.filteredFutureActiveTrips
          .filter(item => item.to_location_2.id == value.to_sublocation);
        }
        this.setLocations();
      });
    }
    /** get location and sublocation from list trips */
    getLocations(listTrips: FutureTrip[], location: string): SubLocation[] {
      const locations = new Map();
      listTrips.map(item => item[location]).forEach(item => {
        if (item) {
          locations.set(item.id, item);
        }
      });
      return [...locations.values()];
    }

    showAllTrips() {
      this.getFutureActiveTripsWithLocations();
      this.searchForm.reset();
     }

    /** Reserved places */
  openReserveDialog(trip: FutureTrip): void {
      this.passBoardService.reserveDialog(PassBoardReserveComponent, trip, (res) => this.reservePlaces(res));
  }

  private reservePlaces(value) {
    let { id, ...payload }  = value;
    payload.passenger = this.passenger;
    this.apiservice.createReservePlaces(id, payload).subscribe(res => {
      this.getUserReservations();
      this.futureActiveTrips.filter( item => item.id === res.trip);
      }, (err: any) => {
        this.openSnackBar(err.messages.message);
      });
  }
  cancelTripByPassenger(id: string) {
    this.apiservice.cancelTripByPassenger(id, {}).subscribe( (res: any) => {
      this.getUserReservations();
      this.getFutureActiveTripsWithLocations();
    }, (err: any) => {
      this.openSnackBar(err.messages.message);
    });
  }

  filteringUserReservationTrips(condition: String[]) {
    console.log(condition);
    this.filteredUserReservationTrips = this.userReservationTrips.filter( item => {
      return condition.includes(item.state);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FutureTrip, Location, SubLocation, User } from '../../shared/entity.interface';
import { ApiService } from '../../shared/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PassBoardReserveComponent } from './pass-board-reserve/pass-board-reserve.component';
import { AuthService } from '../../shared/services/auth.service';
import { BoardService } from '../../shared/services/board.service'

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
  filterDriverTrips = [];
  subscription: any;
  isLogged: boolean;
  stateTrip = [ 'Pending', 'Accepted', 'Rejected', 'Canceled By Passenger', 'Canceled By Driver', 'Trip Canceled']

  constructor(
    private apiservice: ApiService,
    private fb: FormBuilder,
    private authService: AuthService,
    public boardService: BoardService,
    ) { }

  ngOnInit() {
    this.isLogged = this.authService.isTokenAvailable();
    this.subscription = this.authService.isUserLogged().subscribe(data => {
      this.isLogged = data;
    });
    this.getFutureActiveTripsWithLocations();
    (() => {
      if (this.isLogged) {
        this.getUserReservations()
        this.getInfoAboutMe();
      }
    })();
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
        this.filteredFutureActiveTrips =  this.futureActiveTrips;
        this.setLocations();
    }, this.boardService.error);
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
    }, this.boardService.error);
  }

  private getUserReservations() {
    this.apiservice.getUserReservations()
      .subscribe( (res: any) => {
          this.userReservationTrips = res.results;
          this.filteredUserReservationTrips = this.userReservationTrips;
      }, this.boardService.error);
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
      this.boardService.modalDialog(PassBoardReserveComponent, trip, (res) => this.reservePlaces(res));
  }

  private reservePlaces(value) {
    let { id, ...payload }  = value;
    payload.passenger = this.passenger;
    this.apiservice.createReservePlaces(id, payload).subscribe(res => {
      this.getUserReservations();
      this.futureActiveTrips.filter( item => item.id === res.trip);
      }, this.boardService.error);
  }
  cancelTripByPassenger(id: string) {
    this.apiservice.cancelTripByPassenger(id, {}).subscribe( (res: any) => {
      this.getUserReservations();
      this.getFutureActiveTripsWithLocations();
    }, this.boardService.error);
  }

  filteringUserReservationTrips(condition: String[]) {
    this.filteredUserReservationTrips = this.userReservationTrips.filter( item => {
      return condition.includes(item.state);
    });
  }

}

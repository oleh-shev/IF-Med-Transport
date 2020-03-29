import { Component, OnInit } from '@angular/core';
import { FutureTrip, Location, SubLocation, User } from '../../shared/entity.interface';
import { ApiService } from '../../shared/services/api.service';
import { mergeMap, map, } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PassBoardService } from './pass-board.service';
import { PassBoardReserveComponent } from './pass-board-reserve/pass-board-reserve.component';

@Component({
  selector: 'app-pass-board',
  templateUrl: './pass-board.component.html',
  styleUrls: ['./pass-board.component.scss']
})
export class PassBoardComponent implements OnInit {
  futureActiveTrips: FutureTrip[] = [];
  filteredFutureActiveTrips: FutureTrip[] = [];
  userReservationTrips = [];
  passenger: User;
  listLocationTo: SubLocation[] = [];
  listLocationFrom: SubLocation[] = [];
  listLocations: Location[] = [];
  searchForm: FormGroup;

  constructor(
    private apiservice: ApiService,
    private fb: FormBuilder,
    public passBoardService: PassBoardService,
    ) { }

  ngOnInit() {
    this.getFutureActiveTrips();
    this.getUserReservations()
    this.getInfoAboutMe();
    this.createFormForSearchTrip();
    this.onChangeFieldsSearcForm();
  }

  private createFormForSearchTrip() {
    this.searchForm = this.fb.group({
      to_location: [''],
      from_location: ['']
    });
  }

  private getFutureActiveTrips() {
    this.apiservice.getFutureActiveTrips()
    .subscribe(res => {
      if (res) {
        this.futureActiveTrips = res.results.filter( item => !item.current_user_has_reservation);
        console.log(this.futureActiveTrips);
        this.filteredFutureActiveTrips =  this.futureActiveTrips;
        const locationFrom = new Map();
        this.futureActiveTrips.map(item => item.from_location_1)
          .forEach(item => locationFrom.set(item.id, item));
        this.listLocationFrom = [...locationFrom.values()];
        const locationTo = new Map();
        this.futureActiveTrips.map(item => item.to_location_1)
          .forEach(item => locationTo.set(item.id, item));
        this.listLocationTo = [...locationTo.values()];
      }
    });
  }

  private getInfoAboutMe() {
    this.apiservice.getInfoAboutMe()
    .subscribe(res => {
      this.passenger = res;
    });
  }

  private getUserReservations() {
    this.apiservice.getUserReservations()
      .subscribe( res => {
        if (res) {
          console.log(res.results);
          this.userReservationTrips = res.results;
        }
      });
  }

  // private getLocations() {
  //   this.apiservice.getLocations()
  //   .subscribe(res => {
  //     this.listLocations = res.results;
  //   });
  // }

  changeViewDetail(event) {
    let target = event.target;
    let detailBox = target.parentElement.previousElementSibling;
    detailBox.classList.toggle('visable');
    if (detailBox.classList.contains('visable')) {
      target.innerText = 'Приховати';
    } else {
      target.innerText = 'Детально';
    }
  }

    /** handler for change field filterForm "type" */
    private onChangeFieldsSearcForm() {
      this.searchForm.valueChanges.subscribe(value => {
        if (value.from_location) {
          this.futureActiveTrips = this.futureActiveTrips
            .filter(item => item.from_location_1.id == value.from_location);
        }
        if (value.to_location) {
          this.futureActiveTrips = this.futureActiveTrips
          .filter(item => item.to_location_1.id == value.to_location);
        }
      });
    }

    /** Reserved places */
  openReserveDialog(trip: FutureTrip): void {
      this.passBoardService.reserveDialog(PassBoardReserveComponent, trip, (res) => this.reservePlaces(res));
  }

  private reservePlaces(value) {
    let { id, ...payload }  = value;
    payload.passenger = this.passenger;
    this.apiservice.createReservePlaces(id, payload).subscribe(res => console.log(res));
  }
}

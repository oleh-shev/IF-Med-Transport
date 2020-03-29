import { Component, OnInit } from '@angular/core';
import { FutureTrip, Location, SubLocation, User } from '../../shared/entity.interface';
import { ApiService } from '../../shared/services/api.service';
import { mergeMap, map, } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pass-board',
  templateUrl: './pass-board.component.html',
  styleUrls: ['./pass-board.component.scss']
})
export class PassBoardComponent implements OnInit {
  futureActiveTrips: FutureTrip[] = [];
  filteredFutureActiveTrips: FutureTrip[] = [];
  passeger: User;
  listLocationTo: SubLocation[] = [];
  listLocationFrom: SubLocation[] =[];
  searchForm: FormGroup;

  constructor(
    private apiservice: ApiService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.getFutureActiveTrips();
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
        console.log(res.results);
        this.futureActiveTrips = res.results;
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
  changeViewDetail(event) {
    let target = event.target;
    let detailBox = target.previousElementSibling;
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
        //this.filterOption[value](this.listResults);
        console.log(value);
        if (value.from_location) {
          console.log(value.from_location);
          this.futureActiveTrips = this.futureActiveTrips
            .filter(item => item.from_location_1.id == value.from_location);
        }
        if (value.to_location) {
          console.log(value.to_location);
          this.futureActiveTrips = this.futureActiveTrips
          .filter(item => item.to_location_1.id == value.to_location);

        }
        
      });
    }

}

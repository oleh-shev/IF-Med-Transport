import { Component, OnInit } from '@angular/core';
import { Trip, Location, SubLocation } from '../../shared/entity.interface';
import { ApiService } from '../../shared/services/api.service';
import { mergeMap, map, } from 'rxjs/operators';

@Component({
  selector: 'app-pass-board',
  templateUrl: './pass-board.component.html',
  styleUrls: ['./pass-board.component.scss']
})
export class PassBoardComponent implements OnInit {
  futureActiveTrips: Trip[] = [];

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.getFutureActiveTrips();
  }

  private getFutureActiveTrips() {
    this.apiservice.getFutureActiveTrips()
    .subscribe(res => {
      if (res) {
        console.log(res.results[0]);
        this.futureActiveTrips = res.results;
        //console.log(typeof(res));
      }
    });
  }

}

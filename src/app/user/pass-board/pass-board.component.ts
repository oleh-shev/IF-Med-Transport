import { Component, OnInit } from '@angular/core';
import { Trip, Location, SubLocation, User } from '../../shared/entity.interface';
import { ApiService } from '../../shared/services/api.service';
import { mergeMap, map, } from 'rxjs/operators';

@Component({
  selector: 'app-pass-board',
  templateUrl: './pass-board.component.html',
  styleUrls: ['./pass-board.component.scss']
})
export class PassBoardComponent implements OnInit {
  futureActiveTrips: Trip[] = [];
  passeger: User;

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.getFutureActiveTrips();
  }

  private getFutureActiveTrips() {
    this.apiservice.getFutureActiveTrips()
    .subscribe(res => {
      if (res) {
        console.log(res.results);
        this.futureActiveTrips = res.results;
        //console.log(typeof(res));
      }
    });
  }
  changeViewDetail(event) {
    console.log(event);
    let target = event.target;
    let detailBox = target.previousElementSibling;
    detailBox.classList.toggle('visable');
    if (detailBox.classList.contains('visable')) {
      target.innerText = 'Приховати';
    } else {
      target.innerText = 'Детально';
    }
  }

}

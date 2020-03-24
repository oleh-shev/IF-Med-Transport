import { Component, OnInit } from '@angular/core';
import { Trip, Location, SubLocation } from '../../shared/entity.interface';

@Component({
  selector: 'app-pass-board',
  templateUrl: './pass-board.component.html',
  styleUrls: ['./pass-board.component.scss']
})
export class PassBoardComponent implements OnInit {
  futureActiveTrips: Trip[] = [];
  constructor() { }

  ngOnInit() {
  }

}

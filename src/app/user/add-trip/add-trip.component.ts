import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerIntl} from '@angular/material';
import {AppDateAdapter, APP_DATE_FORMATS} from '../../shared/mat-date-picker-config/format-datepicker';
import {Router} from '@angular/router';
import {Trip} from '../../shared/entity.interface';
import * as moment from 'moment';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: moment.locale('uk')}
  ]
})
export class AddTripComponent implements OnInit {

  locations: any;
  subLocationsFrom: any;
  subLocationsTo: any;
  subLocationsFromAvailable = true;
  subLocationsToAvailable = true;
  tripData: FormGroup;
  currDate: Date;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: Router,
  ) {
    this.tripData = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]],
      from_location_1: ['', Validators.required],
      from_location_2: [''],
      to_location_1: ['', Validators.required],
      to_location_2: [''],
      from_text_description: ['', Validators.required],
      to_text_description: ['', Validators.required],
      car_description: ['', Validators.required],
      available_places: ['', Validators.required],
      driver_comments: [''],
    });
  }

  ngOnInit() {
    this.currDate = new Date();
    this.getLocations().subscribe((data: any) => {
      this.locations = data.results;
    });
  }

  getLocations() {
    return this.http.get('locations/');
  }


  formSubLocations(id, from) {
    const chosenLocation = this.locations.find(location => location.id === id);
    if (chosenLocation.sublocations.length > 0) {
      from ? this.subLocationsFrom = chosenLocation.sublocations : this.subLocationsTo = chosenLocation.sublocations;
      from ? this.subLocationsFromAvailable = true : this.subLocationsToAvailable = true;
    } else {
      from ? this.subLocationsFromAvailable = false : this.subLocationsToAvailable = false;
    }
  }

  onSubmit() {
    const data = this.tripData.value;
    data.departure_time = this.formDeparture(data.date, data.time);
    delete data.date;
    delete data.time;
    this.http.post('trips/', data).subscribe(() => {
      this.route.navigate(['driver-board']);
    }, err => {
      const errors: Trip = err.error;
      Object.keys(errors).forEach(prop => {
        const formControl = this.tripData.get(prop);
        if (formControl) {
          formControl.setErrors({
            serverError: errors[prop]
          });
        }
      });
    });
  }

  formDeparture(date, time) {
    let day: string = date.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (date.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    const year = date.getFullYear();
    return `${year}-${month}-${day}T${time}+03:00`;
  }

}

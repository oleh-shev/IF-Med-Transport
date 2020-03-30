import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {images} from '../../shared/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logo: string = images.logo;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }


}

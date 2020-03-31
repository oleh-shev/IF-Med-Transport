import { Component, OnInit } from '@angular/core';
import { defaultImage } from 'src/app/shared/default-image/default-image';
import { User } from 'src/app/shared/entity.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  img: string = defaultImage;
  obj: User = {
    first_name: 'Yura',
    last_name: 'Khomitskyi',
    email: 'user@example.com',
    description: 'VodiyAmsdaKDSlakdalfsjdfhskjfshkjdfhsiFHDsUIFHdUIFHsiuHFDuiFHSDUfhsiufhsdufsdhfsdjfsdfsjfklsfjslkfjslfsjdf',
    id: '7f1598b8-9f78-45c1-8306-45e0f3c0b4ae',
    phone_number: '+380665600730'
  };

  constructor() { }

  ngOnInit() {
    this.concatName(this.obj.first_name, this.obj.last_name);
  }

  concatName(...items: Array<string>) {
    return items.join(' ');
  }

}

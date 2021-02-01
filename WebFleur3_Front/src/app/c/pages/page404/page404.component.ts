import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../s/users.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {
  constructor(private _user: UsersService) {}

  currentUser;

  ngOnInit(): void {
    this._user.userObservable.subscribe((data) => {
      // console.log(data);
      this.currentUser = data;
      console.log(this.currentUser);
    });
  }
}

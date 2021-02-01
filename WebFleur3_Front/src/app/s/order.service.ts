import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../i/order';
import { User } from '../i/user';
import { ApiSettingsService } from './api-settings.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private _http: HttpClient,
    private _apiSettings: ApiSettingsService
  ) {}

  private url = this._apiSettings.url.order;
  private option = this._apiSettings.option;

  currentUserOrders: Order[];

  loadCurrentUserOrders(currentUser: User): void {
    this._http.post(this.url, currentUser, this.option).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  createOrder(currentUser: User, order: Order): void {
    this._http
      .post(this.url, { user: currentUser, order: order }, this.option)
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );
  }
}

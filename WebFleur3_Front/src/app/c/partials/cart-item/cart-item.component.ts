import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/i/cartItem';
import { ApiSettingsService } from 'src/app/s/api-settings.service';
import { CartService } from 'src/app/s/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  constructor(private _cart: CartService, private _api: ApiSettingsService) {}

  ngOnInit(): void {}

  uploads: string = this._api.uplaods;
  cart = this._cart;
  @Input() item: CartItem;
}

import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/i/cartItem';
import { CartService } from 'src/app/s/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private _cart: CartService) {}

  total: number;
  cart: CartItem[];

  ngOnInit(): void {
    this._cart.cartObservable.subscribe((data: CartItem[]) => {
      this.cart = data;
      this.total = this._cart.getCartTotal();
    });
  }
}

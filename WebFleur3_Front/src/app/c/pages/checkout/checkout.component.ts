import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/i/cartItem';
import { Product } from 'src/app/i/product';
import { CartService } from 'src/app/s/cart.service';
import { UsersService } from 'src/app/s/users.service';

declare const paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('paypal', { static: false }) paypalElement: ElementRef;

  paidFor: boolean = false;
  currentUser;
  cart: CartItem[];
  total: number;

  constructor(
    private _router: Router,
    private _cart: CartService,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get current Cart
    this._cart.cartObservable.subscribe((data: CartItem[]) => {
      this.cart = data;
      this.total = this._cart.getCartTotal();
    });

    // Get current user data or redirect to login``
    this.currentUser = localStorage.getItem('CURRENT_USER')
      ? JSON.parse(localStorage.getItem('CURRENT_USER'))
      : this._router.navigateByUrl('/user/login');
  }

  ngAfterViewInit() {
    // Create Paypal button
    paypal
      .Buttons({
        createOrder: (data, action) => {
          return action.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.total / 100,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this._http
            .post(
              'https://webfleur3-default-rtdb.europe-west1.firebasedatabase.app/' +
                this.currentUser.id +
                '/order.json',
              this.cart
            )
            .subscribe((data) => {
              console.log(data);
            });
          this.paidFor = true;
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}

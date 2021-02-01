import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../i/cartItem';
import { Product } from '../i/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  cart: CartItem[] = [];
  cartSubject: Subject<object> = new BehaviorSubject<object>(this.cart);
  cartObservable: Observable<object> = this.cartSubject.asObservable();

  onAddToCart(product: Product) {
    let isInCart: boolean = false;

    // Search if product allready exists on cart
    this.cart.forEach((item: CartItem) => {
      if (item.product.id == product.id) {
        item.quantity++;
        isInCart = true;
        return;
      }
    });

    // If not add this product to cart (with quantity = 1)
    if (!isInCart) {
      this.cart.push({ quantity: 1, product });
    }

    this.cartSubject.next(this.cart);
  }

  onRemoveOneFromCart(product: Product) {
    // Search product in cart
    this.cart.forEach((item, index, object) => {
      if (item.product.id == product.id) {
        // Update cart
        item.quantity--;
        // If item quantity == 0, delete it from the cart
        if (item.quantity == 0) {
          object.splice(index, 1);
        }
      }
    });
    this.cartSubject.next(this.cart);
  }

  onRemoveFromCart(product: Product) {
    // Search product in cart
    this.cart.forEach((item, index, object) => {
      if (item.product.id == product.id) {
        // remove from cart
        object.splice(index, 1);
      }
    });
    this.cartSubject.next(this.cart);
  }

  getCartTotal(): number {
    let total: number = 0;
    this.cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }
}

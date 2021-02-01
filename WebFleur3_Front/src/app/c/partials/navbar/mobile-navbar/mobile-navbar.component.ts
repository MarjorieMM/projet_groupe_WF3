import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/i/cartItem';
import { Category } from 'src/app/i/category';
import { NFrameService } from 'src/app/s/animation/n-frame.service';
import { CartService } from 'src/app/s/cart.service';
import { CategoryService } from 'src/app/s/category.service';
import { CurrentUser } from '../../../../i/user';
declare let $: any;

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  constructor(
    private _nframe: NFrameService,
    private _categories: CategoryService,
    private _cart: CartService
  ) {
    this.curUser = localStorage.getItem('CURRENT_USER')
      ? JSON.parse(localStorage.getItem('CURRENT_USER'))
      : '';
  }

  public curUser: CurrentUser;

  ngOnInit(): void {
    this._nframe.drop();
    this._cart.cartObservable.subscribe((data: CartItem[]) => {
      this.cart = data;
    });
    let subCategories = this._categories.categories.subscribe(
      (data: Category[]) => {
        this.categories = data;
        subCategories.unsubscribe();
      }
    );
  }

  navIncrement: boolean = true;

  onNavOpen() {
    this.navIncrement
      ? $('#nav').addClass('fa-times')
      : $('#nav').removeClass('fa-times');
    this.navIncrement = !this.navIncrement;
  }

  onItemQuantityCount(): number {
    let count: number = 0;
    this.cart.forEach((item: CartItem) => {
      count += item.quantity;
    });
    return count;
  }

  public cart: CartItem[];
  public menuOpen: boolean = false;
  public categories: Category[];
}

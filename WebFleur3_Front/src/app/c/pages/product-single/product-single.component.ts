import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/i/product';
import { NFrameService } from 'src/app/s/animation/n-frame.service';
import { ApiSettingsService } from 'src/app/s/api-settings.service';
import { CartService } from 'src/app/s/cart.service';
import { ProductsService } from 'src/app/s/products.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss'],
})
export class ProductSingleComponent implements OnInit {
  constructor(
    private _products: ProductsService,
    private _route: ActivatedRoute,
    private _api: ApiSettingsService,
    private _cart: CartService,
    private _nframe: NFrameService
  ) {}

  public cart = this._cart;
  public uplaods: string = this._api.uplaods;
  public products: Product[];
  // This fake data is here to ovoid errors in console.
  // Without it, product is not defined until async operations are done
  // But is used in template.
  public product: Product = {
    category: { id: 0, name: '' },
    description: '',
    id: 0,
    name: '',
    picture: '',
    price: 0,
  };
  public productId: number;

  ngOnInit(): void {
    this._nframe.send();
    this._nframe.validButton();

    // get route params
    this._route.params.subscribe((data: any) => {
      this.productId = data.id;
      //get products
      let subProducts = this._products.http.subscribe((data: Product[]) => {
        this.products = data;
        //find current product
        this.products.forEach((product: Product) => {
          if (product.id == this.productId) {
            this.product = product;
          }
        });
        subProducts.unsubscribe();
      });
    });
  }
}

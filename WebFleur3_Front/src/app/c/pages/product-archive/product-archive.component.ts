import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/i/category';
import { Product } from 'src/app/i/product';
import { CategoryService } from 'src/app/s/category.service';
import { ProductsService } from 'src/app/s/products.service';

@Component({
  selector: 'app-product-archive',
  templateUrl: './product-archive.component.html',
  styleUrls: ['./product-archive.component.scss'],
})
export class ProductArchiveComponent implements OnInit {
  constructor(
    private _products: ProductsService,
    private _route: ActivatedRoute,
    private _category: CategoryService
  ) {}

  categories: Category[];
  products: Product[];
  idCategory: number;

  // This fake data is here to ovoid errors in console.
  // Without it, category is not defined until async operations are done
  // but is used in template.
  category: Category = { id: 0, name: '' };
  sub: Subscription;

  ngOnInit(): void {
    // products subscription
    let subProducts = this._products.http.subscribe((data: Product[]) => {
      this.products = data;
      subProducts.unsubscribe();
    });

    // categories subscription
    let subCategories = this._category.categories.subscribe(
      (data: Category[]) => {
        this.categories = data;
        // get current category id
        this.sub = this._route.params.subscribe((params) => {
          this.idCategory = +params['id'];

          // search category with id
          this.categories.forEach((category: Category) => {
            if (category.id == this.idCategory) {
              this.category = category;
            }
          });
        });
        subCategories.unsubscribe();
      }
    );
  }
}

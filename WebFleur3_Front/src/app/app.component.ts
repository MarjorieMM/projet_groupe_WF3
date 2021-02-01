import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Product } from './i/product';
import { User } from './i/user';
import { ProductsService } from './s/products.service';
import { UsersService } from './s/users.service';
import { NFrameService } from './s/animation/n-frame.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    // private route: ActivatedRoute,
    private _nframe: NFrameService,
    private _products: ProductsService,
    private _users: UsersService
  ) {}

  public products: Product[];
  public user: User;
  // public id: string;

  public loader: boolean = true;

  innerWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  data: any = {
    testid: 54,
    testText: 'Bonjour',
  };

  ngOnInit(): void {
    // this._http
    //   .put(
    //     'https://webfleur3-default-rtdb.europe-west1.firebasedatabase.app/user54.json',
    //     this.data
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    this.innerWidth = window.innerWidth;
    this._nframe.doAll();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../i/product';
import { ApiSettingsService } from './api-settings.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private _http: HttpClient,
    private _apiSettings: ApiSettingsService
  ) {}

  private option = this._apiSettings.option;
  private url = this._apiSettings.url.product;
  public http: Observable<object> = this._http.get(this.url, this.option);
}

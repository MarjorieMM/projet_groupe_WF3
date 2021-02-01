import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettingsService } from './api-settings.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private _http: HttpClient,
    private _apiSettings: ApiSettingsService
  ) {}

  private url = this._apiSettings.url.category;
  private option = this._apiSettings.option;
  public categories: Observable<object> = this._http.get(this.url, this.option);
}

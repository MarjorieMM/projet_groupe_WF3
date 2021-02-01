import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiSettingsService {
  constructor() {}

  // Headers option
  option = {
    headers: { apiKey: 'API_KEY_HERE' },
  };

  // uploads path
  uplaods: string = 'https://127.0.0.1:8000/uploads/';

  // ApiURL
  url = {
    product: 'https://127.0.0.1:8000/api/products',
    user: 'https://127.0.0.1:8000/api/users',
    category: 'https://127.0.0.1:8000/api/category',
  };
}

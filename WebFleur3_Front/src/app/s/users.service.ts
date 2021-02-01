import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrentUser, User } from '../i/user';
import { ApiSettingsService } from './api-settings.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';

export interface login {
  mail: string;
  pswd: string;
}

export interface Email {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  pipe(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private _http: HttpClient,
    private _apiSettings: ApiSettingsService,
    private _toastr: NotificationsService,
    private _router: Router
  ) {}

  private _option = this._apiSettings.option;
  private _url = this._apiSettings.url.user;
  public http: Observable<object> = this._http.post(this._url, this._option);

  user = {};
  userSubject: Subject<object> = new BehaviorSubject(this.user);
  userObservable: Observable<object> = this.userSubject.asObservable();

  postUser(data): Observable<object> {
    let http = this._http.post(this._url, data, this._option);
    return http;
  }

  // Création de compte
  register(form: FormGroup): void {
    let http = this._http
      .post(this._url.concat('/register'), form.value, this._option)
      .subscribe(
        (data) => {
          this.userSubject.next(data);
          this._router.navigateByUrl('/');
        }

        // () => this._toastr.showError('Erreur', "L'adresse email existe déjà")
      );
  }

  // Connexion
  login(form: FormGroup): void {
    this._http
      .post(this._url.concat('/login'), form.value, this._option)
      .subscribe(
        (data: CurrentUser) => this.userSubject.next(data),
        () =>
          this._toastr.showError(
            'Erreur',
            'Mot de passe et/ou adresse email incorrect'
          )
      );
  }
  delete(id: number): Observable<any> {
    return this._http.delete(this._url.concat(`/deleteuser/${id}`));
  }

  // get user info with email from JWT token
  getUserFromToken(ls: Email): Observable<object> {
    let http = this._http.post(this._url.concat('/account'), ls, this._option);

    return http;
  }

  getUserFromId(id: number): Observable<object> {
    let http = this._http.get(this._url.concat(`/account/${id}`), this._option);

    return http;
  }

  update(form: FormGroup) {
    let http = this._http
      .put(
        this._url.concat(`/update/${form.value.id}`),
        form.value,
        this._option
      )
      .subscribe((data: CurrentUser) => {
        this.userSubject.next(data);
      });
  }
}

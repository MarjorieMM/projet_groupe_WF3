import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser, User } from '../../../i/user';
import { UsersService } from '../../../s/users.service';
import jwt_decode from 'jwt-decode';
import { NotificationsService } from '../../../s/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastr: NotificationsService,
    public login: UsersService
  ) {}

  public _authForm: FormGroup;
  public _isSubmitted = false;
  public curUser: CurrentUser;

  ngOnInit() {
    localStorage.getItem('CURRENT_USER')
      ? this._router.navigateByUrl('/user/account')
      : '';

    this._authForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    let decoded: any = '';
    this.login.userObservable.subscribe(
      (data: CurrentUser) => {
        const token = JSON.stringify(data.token);
        if (token) {
          decoded = jwt_decode(token);
          const date = new Date(0);
          date.setUTCSeconds(decoded.exp);
          localStorage.setItem('ACCESS_TOKEN', token);
          localStorage.setItem('EXPIRES_IN', date.toString());
          localStorage.setItem('EMAIL', decoded.email);
        }
        if (decoded) {
          this.login
            .getUserFromToken(decoded)
            .subscribe((data: CurrentUser) => {
              if (data) {
                this.curUser = data;
                localStorage.setItem('CURRENT_USER', JSON.stringify(data));
                this._toastr.showInfo(
                  'vous êtes connecté',
                  `Bonjour, ${this.curUser.firstname}`
                );
                this._router.navigateByUrl('/');
              }
            });
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getErrorMessage(item: string) {
    const error = this._authForm.controls;
    const emailErr = error.email;
    const passwordErr = error.password;
    switch (item) {
      case 'email':
        if (emailErr.hasError('required')) {
          return 'Vous devez votre adresse email';
        }
        return emailErr.hasError('email') ? 'Adresse email non valide' : '';
      case 'password':
        if (passwordErr.hasError('required')) {
          return 'Veuillez entrer votre mot de passe';
        }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser, User } from '../../../i/user';
import { UsersService } from 'src/app/s/users.service';
import { NotificationsService } from '../../../s/notifications.service';
import { MustMatch } from '../../../p/must-match';
import { FormErrorsService } from '../../../s/form-errors.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
})
export class UpdateFormComponent implements OnInit {
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    public update: UsersService,
    public _user: UsersService,
    public _notif: NotificationsService,
    public _formErrors: FormErrorsService
  ) {}

  public authForm: FormGroup;
  public isSubmitted = false;
  public curUser: CurrentUser;

  ngOnInit() {
    this.curUser = JSON.parse(localStorage.getItem('CURRENT_USER'));
    !localStorage.getItem('CURRENT_USER')
      ? this._router.navigateByUrl('/user/login')
      : '';

    this.curUser = JSON.parse(localStorage.getItem('CURRENT_USER'));

    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'confirmPassword'),
    };

    this.authForm = this.formBuilder.group(
      {
        id: [''],
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
        cp: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
        town: ['', [Validators.required, Validators.minLength(3)]],
      },
      formOptions
    );

    this._user
      .getUserFromId(this.curUser.id)
      .subscribe((data: User) => this.authForm.patchValue(data));

    this.update.userObservable.subscribe((data: CurrentUser) => {
      if (data.id) {
        localStorage.clear();

        const url = '/user/login';
        this._router.navigateByUrl(url);
        this._notif.showSuccess(
          'vos modifications ont bien été prises en compte',
          'Merci de vous reconnecter'
        );
      }
    });
  }

  getErrorMessage(item: string) {
    const error = this.authForm.controls;
    const emailErr = error.email;
    const lastnameErr = error.lastname;
    const firstnameErr = error.firstname;
    const confirmPassErr = error.confirmPassword;
    const passwordErr = error.password;
    const addressErr = error.address;
    const cpErr = error.cp;
    const townErr = error.town;

    switch (item) {
      case 'lastname':
        if (lastnameErr.hasError('required')) {
          return 'Vous devez entrer votre nom';
        }
        return lastnameErr.hasError('minlength')
          ? 'Votre nom doit faire plus de 3 caractères'
          : '';
      case 'firstname':
        if (firstnameErr.hasError('required')) {
          return 'Vous devez entrer votre prénom';
        }
        return firstnameErr.hasError('minlength')
          ? 'Votre prénom doit faire plus de 3 caractères'
          : '';
      case 'email':
        if (emailErr.hasError('required')) {
          return 'Vous devez entrer une adresse email';
        }
        return emailErr.hasError('email') ? 'Adresse email non valide' : '';
      case 'password':
        if (passwordErr.hasError('required')) {
          return 'Vous devez choisir un mot de passe';
        }
      case 'confirmPassword':
        if (confirmPassErr.hasError('mustMatch')) {
          return 'Les mots de passe ne correspondent pas';
        }
      case 'address':
        if (addressErr.hasError('required')) {
          return 'Vous devez entrer votre adresse';
        }
        return addressErr.hasError('minlength')
          ? 'Votre ville doit faire plus de 3 caractères'
          : '';
      case 'cp':
        if (cpErr.hasError('required')) {
          return 'Vous devez entrer votre code postal';
        }
        return cpErr.hasError('pattern') ? 'Code postal invalide' : '';
      case 'town':
        if (townErr.hasError('required')) {
          return 'Vous devez entrer votre ville';
        }
        return townErr.hasError('minlength')
          ? 'Votre ville doit faire plus de 3 caractères'
          : '';
    }
  }
}

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

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastr: NotificationsService,
    public register: UsersService
  ) {}

  public authForm: FormGroup;
  public isSubmitted = false;
  public user: CurrentUser;
  public curUser: CurrentUser;
  public errorMessage: any = '';
  public breakpoint: number;

  ngOnInit() {
    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'confirmPassword'),
    };
    this.authForm = this._formBuilder.group(
      {
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

    this.register.userObservable.subscribe(
      (data: CurrentUser) => {
        if (data.id) {
          this.curUser = data;
          this._toastr.showSuccess(
            'Votre compte est maintenant créé',
            `Bienvenue, ${this.curUser.firstname}`
          );
          const url = '/user/login';
          this._router.navigateByUrl(url);
        }
      },
      (error) => {
        this._toastr.showError(
          "Il y a eu erreur lors de l'inscription",
          'Erreur'
        );
        console.error('error caught in component');
        console.log(error.title);
      }
    );
  }

  getErrorMessage(item: string) {
    const error = this.authForm.controls;
    const emailErr = error.email;
    const lastnameErr = error.lastname;
    const firstnameErr = error.firstname;
    const passwordErr = error.password;
    const confirmPassErr = error.confirmPassword;
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
        return passwordErr.hasError('pattern')
          ? 'Le mot de passe dois contenir 8 caractères avec un chiffre et une lettre majuscule'
          : '';
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

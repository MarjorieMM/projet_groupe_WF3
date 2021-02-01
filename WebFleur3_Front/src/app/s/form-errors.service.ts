import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorsService {
  constructor() {}

  getErrorMessage(form: FormGroup, item: string) {
    const error = form.controls;

    const emailErr = error.email;
    const lastnameErr = error.lastname;
    const firstnameErr = error.firstname;
    const confirmPassErr = error.confirmPassword;
    const passwordErr = error.password;
    const addressErr = error.address;
    const cpErr = error.cp;
    const townErr = error.town;

    switch (item) {
      case 'fistName':
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

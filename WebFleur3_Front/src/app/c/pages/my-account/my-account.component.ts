import { Component, OnInit } from '@angular/core';
import { Email, UsersService } from 'src/app/s/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUser, User } from '../../../i/user';
import { NotificationsService } from '../../../s/notifications.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  constructor(
    private _user: UsersService,
    private _router: Router,
    private _notif: NotificationsService
  ) {}
  public curUser: CurrentUser;

  ngOnInit(): void {
    this.curUser = localStorage.getItem('CURRENT_USER')
      ? JSON.parse(localStorage.getItem('CURRENT_USER'))
      : '';
    !this.curUser ? this._router.navigateByUrl('/user/login') : '';
  }

  deleteAccount(): void {
    this._user.delete(this.curUser.id).subscribe(
      (data) => {
        localStorage.clear();
        this._notif.showWarning(
          'Votre compte a bien été supprimé',
          'A bientôt'
        );
        this._router.navigate(['/user/login']);
      },
      (error) => {
        this._notif.showError(
          'Veuillez recommencer',
          'Erreur lors de la suppression'
        );
        console.log(error);
      }
    );
  }

  logout() {
    localStorage.clear();
    this._notif.showSuccess('Vous êtes maintenant déconnecté(e)', 'Au revoir');
    this._router.navigateByUrl('/');
  }
}

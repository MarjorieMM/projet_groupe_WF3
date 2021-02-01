import { Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private _toastr: ToastrService) {}

  public option: {} = {
    positionClass: 'toast-bottom-full-width',
  };
  showSuccess(message: string, title: string) {
    this._toastr.success(message, title, this.option);
  }

  showError(message: string, title: string) {
    this._toastr.error(message, title, this.option);
  }

  showInfo(message: string, title: string) {
    this._toastr.info(message, title, this.option);
  }

  showWarning(message: string, title: string) {
    this._toastr.warning(message, title, this.option);
  }
}

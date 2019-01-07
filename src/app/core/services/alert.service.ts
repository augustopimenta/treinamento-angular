import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AlertType from '../enums/alert-type.enum';
import Alert from '../models/alert.model';
import Timer = NodeJS.Timer;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  timer: Timer;

  private subject = new BehaviorSubject<Alert>({
    open: false,
    type: AlertType.SUCCESS,
    message: ''
  });

  data$ = this.subject.asObservable();

  success(message: string, delay = 0) {
    this.subject.next({
      open: true,
      type: AlertType.SUCCESS,
      message
    });

    this.hideAfterTime(delay);
  }

  error(message: string, delay = 0) {
    this.subject.next({
      open: true,
      type: AlertType.ERROR,
      message
    });

    this.hideAfterTime(delay);
  }

  hide() {
    const alert = this.subject.getValue();

    this.subject.next({
      open: false,
      type: alert.type,
      message: alert.message
    });
  }

  private hideAfterTime(delay: number) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (delay > 0) {
      this.timer = setTimeout(() => this.hide(), delay);
    }
  }

}

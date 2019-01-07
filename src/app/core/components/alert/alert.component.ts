import { Component, Input } from '@angular/core';
import Alert from '../../models/alert.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent  {

  alert$ = this.alert.data$;

  onClose() {
    this.alert.hide();
  }

  constructor(private alert: AlertService) {}

}

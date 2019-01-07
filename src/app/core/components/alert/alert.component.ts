import { Component, Input } from '@angular/core';
import Alert from '../../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent  {

  @Input() alert: Alert;

  onClose() {
    console.log('Fechar alert');
  }

}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-total-panel',
  templateUrl: './total-panel.component.html',
  styleUrls: ['./total-panel.component.scss']
})
export class TotalPanelComponent {

  @Input() total: number;
  @Input() pending: number;

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import MonthResult from '../../models/month-result.model';
import SelectedMonth from './selected-month.model';

@Component({
  selector: 'app-months-panel',
  templateUrl: './months-panel.component.html',
  styleUrls: ['./months-panel.component.scss']
})
export class MonthsPanelComponent {

  @Input() months: MonthResult;
  @Input() selectedMonthIndex: number;

  @Output() select = new EventEmitter<SelectedMonth>();

  selectMonth(index: number) {
    this.select.emit({ index, month: this.months[index] });
  }

}

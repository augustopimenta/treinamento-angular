import { Component, Input } from '@angular/core';
import PassSecurity from '../../pages/register/pass-security.enum';

@Component({
  selector: 'app-security-indicator',
  templateUrl: './security-indicator.component.html',
  styleUrls: ['./security-indicator.component.scss']
})
export class SecurityIndicatorComponent {

  @Input() strong: number;

  getColor() {
    switch (this.strong) {
      case PassSecurity.WEAK:
        return 'red';
      case PassSecurity.MEDIUM:
        return 'orange';
      default:
        return 'green';
    }
  }

  getIndicators() {
    return ['#CCC', '#CCC', '#CCC', '#CCC'].map((defaultColor: string, i) => {
      const color = this.getColor();

      if (i <= this.strong) {
        return color;
      }

      return defaultColor;
    });
  }

  get description(): string {
    switch (this.strong) {
      case PassSecurity.WEAK:
        return 'Fraca';
      case PassSecurity.MEDIUM:
        return 'Mediana';
      case PassSecurity.STRONG:
      case PassSecurity.VERY_STRONG:
        return 'Forte';
    }
  }

}

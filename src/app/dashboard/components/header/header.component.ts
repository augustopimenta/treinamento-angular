import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() userPhoto: string;
  @Input() userName: string;

  @Output() logout = new EventEmitter();

  get userFirstName() {
    return this.userName.split(' ')[0];
  }

  onLogout() {
    this.logout.emit();
  }
}

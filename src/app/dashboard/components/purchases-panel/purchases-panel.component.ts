import {Component, EventEmitter, Input, Output} from '@angular/core';
import Purchase from '../../models/purchase.model';

@Component({
  selector: 'app-purchases-panel',
  templateUrl: './purchases-panel.component.html',
  styleUrls: ['./purchases-panel.component.scss']
})
export class PurchasesPanelComponent {

  @Input() purchases: Purchase[];

  @Output() addPurchase = new EventEmitter();
  @Output() togglePurchase = new EventEmitter<Purchase>();
  @Output() updatePurchase = new EventEmitter<Purchase>();
  @Output() deletePurchase = new EventEmitter<Purchase>();

  onAdd() {
    this.addPurchase.emit();
  }

  onToggle(purchase: Purchase) {
    this.togglePurchase.emit(purchase);
  }

  onUpdate(purchase: Purchase) {
    this.updatePurchase.emit(purchase);
  }

  onDelete(purchase: Purchase) {
    this.deletePurchase.emit(purchase);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import MonthResult from '../../models/month-result.model';
import Purchase from '../../models/purchase.model';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal.component';
import { AlertService } from '../../../core/services/alert.service';
import { DialogService } from '../../../core/services/dialog.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Logout } from '../../../auth/auth.actions';
import { selectAuthUser } from '../../../auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user$ = this.store.pipe(select(selectAuthUser));

  selectedMonth = 0;

  months: MonthResult[] = [
    {date: new Date(2019, 0, 1), total: 100, pending: 10 },
    {date: new Date(2019, 1, 1), total: 100, pending: 10 },
    {date: new Date(2019, 2, 1), total: 100, pending: 10 },
    {date: new Date(2019, 3, 1), total: 100, pending: 10 },
  ];

  purchases: Purchase[] = [
    {id: 1, date: '2019-01-10', description: 'Pão de queijo', paid: true, value: 2, quantity: 3, total: 6 }
  ];

  @ViewChild(PurchaseModalComponent) purchaseModal: PurchaseModalComponent;

  constructor(private store: Store<AppState>) {}

  onLogout() {
    this.store.dispatch(new Logout({ error: '' }));
  }

  startNewPurchase() {
    this.purchaseModal.show();
  }

  finishNewPurchase(purchase: Purchase) {
    console.log(purchase);
  }

}

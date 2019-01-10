import { Component, OnInit, ViewChild } from '@angular/core';
import MonthResult from '../../models/month-result.model';
import Purchase from '../../models/purchase.model';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Logout } from '../../../auth/auth.actions';
import { selectAuthUser } from '../../../auth/auth.selectors';
import { RequestedPurchases } from '../../dashboard.actions';
import {
  selectDashboardLoading,
  selectDashboardMonthGroups,
  selectDashboardSelectedMonth,
  selectDashboardTotals
} from '../../dashboard.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private today = new Date();

  user$ = this.store.pipe(select(selectAuthUser));
  totals$ = this.store.pipe(select(selectDashboardTotals));
  loading$ = this.store.pipe(select(selectDashboardLoading));
  months$ = this.store.pipe(select(selectDashboardMonthGroups(this.today)));
  selectedMonth$ = this.store.pipe(select(selectDashboardSelectedMonth));

  purchases: Purchase[] = [
    {id: 1, date: '2019-01-10', description: 'Pão de queijo', paid: true, value: 2, quantity: 3, total: 6 }
  ];

  @ViewChild(PurchaseModalComponent) purchaseModal: PurchaseModalComponent;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new RequestedPurchases());
  }

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

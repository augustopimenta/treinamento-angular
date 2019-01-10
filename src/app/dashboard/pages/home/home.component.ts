import { Component, OnInit, ViewChild } from '@angular/core';
import Purchase from '../../models/purchase.model';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Logout } from '../../../auth/auth.actions';
import { selectAuthUser } from '../../../auth/auth.selectors';
import { ChangeSelectedMonth, CreatePurchase, RequestedPurchases } from '../../dashboard.actions';
import {
  selectDashboardLoading,
  selectDashboardMonthGroups,
  selectDashboardSelectedMonth, selectDashboardSelectedPurchases,
  selectDashboardTotals
} from '../../dashboard.selectors';
import { PurchasesService } from '../../services/purchases.service';
import { AlertService } from '../../../core/services/alert.service';

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
  purchases$ = this.store.pipe(select(selectDashboardSelectedPurchases(this.today)));

  loading = false;

  @ViewChild(PurchaseModalComponent) purchaseModal: PurchaseModalComponent;

  constructor(private store: Store<AppState>, private purchasesService: PurchasesService, private alert: AlertService) {}

  ngOnInit() {
    this.store.dispatch(new RequestedPurchases());
  }

  logout() {
    this.store.dispatch(new Logout({ error: '' }));
  }

  changeMonth(month) {
    this.store.dispatch(new ChangeSelectedMonth({ index: month.index }));
  }

  startNewPurchase() {
    this.purchaseModal.show();
  }

  finishPurchase(purchase: Purchase) {
    this.purchasesService.create(purchase).subscribe(createdPurchase => {
      this.store.dispatch(new CreatePurchase({ purchase: createdPurchase }));

      this.alert.success('Compra criada!', 3000);

      this.purchaseModal.hide();
    }, () => {
      this.alert.error('Não foi possível criar a compra', 5000);
    });
  }

}

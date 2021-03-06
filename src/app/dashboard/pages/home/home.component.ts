import { Component, OnInit, ViewChild } from '@angular/core';
import Purchase from '../../models/purchase.model';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Logout } from '../../../auth/auth.actions';
import { selectAuthUser } from '../../../auth/auth.selectors';
import { ChangeSelectedMonth, CreatePurchase, DeletePurchase, RequestedPurchases, UpdatePurchase } from '../../dashboard.actions';
import {
  selectDashboardLoading,
  selectDashboardMonthGroups,
  selectDashboardSelectedMonth, selectDashboardSelectedPurchases,
  selectDashboardTotals
} from '../../dashboard.selectors';
import { PurchasesService } from '../../services/purchases.service';
import { AlertService } from '../../../core/services/alert.service';
import { DialogService } from '../../../core/services/dialog.service';
import { DatePipe } from '@angular/common';

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

  @ViewChild(PurchaseModalComponent) purchaseModal: PurchaseModalComponent;

  constructor(
    private store: Store<AppState>,
    private purchasesService: PurchasesService,
    private alert: AlertService,
    private dialog: DialogService,
    private date: DatePipe
  ) {}

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

  startUpdatePurchase(purchase: Purchase) {
    this.purchaseModal.show(purchase);
  }

  startDeletePurchase(purchase: Purchase) {
    const date = this.date.transform(purchase.date, 'dd/MM/yyyy');

    this.dialog.confirm(
      'Excluir compra',
      `Deseja realmente excluir a compra de <br> <strong> (${date} - ${purchase.description}) </strong> ?`,
      () => {
        this.purchasesService.delete(purchase.id)
          .subscribe(() => {
            this.store.dispatch(new DeletePurchase({ id: purchase.id }));

            this.alert.success('Compra excluida!', 3000);
          }, () => {
            this.alert.error('Não foi possível excluir a compra', 5000);
          });
      }
    );
  }

  togglePaidPurchase(data: Purchase) {
    this.purchasesService.update({ ...data, paid: !data.paid })
      .subscribe(purchase => {
        this.store.dispatch(new UpdatePurchase({ purchase }));

        this.alert.success('Compra editada!', 3000);
      }, () => {
        this.alert.error('Não foi possível editar a compra', 5000);
      });
  }

  finishPurchase(data: Purchase) {
    if (data.id) {
      this.purchasesService.update(data).subscribe(purchase => {
        this.store.dispatch(new UpdatePurchase({ purchase }));

        this.alert.success('Compra editada!', 3000);

        this.purchaseModal.hide();
      }, () => {
        this.alert.error('Não foi possível editar a compra', 5000);
      });
    } else {
      this.purchasesService.create(data).subscribe(purchase => {
        this.store.dispatch(new CreatePurchase({ purchase }));

        this.alert.success('Compra criada!', 3000);

        this.purchaseModal.hide();
      }, () => {
        this.alert.error('Não foi possível criar a compra', 5000);
      });
    }
  }

}

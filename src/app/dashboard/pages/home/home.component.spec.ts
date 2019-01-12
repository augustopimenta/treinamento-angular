import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import {reducer as dashboardReducer } from '../../dashboard.reducer';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Purchase from '../../models/purchase.model';
import { AppState } from '../../../reducers';
import { Logout } from '../../../auth/auth.actions';
import { ChangeSelectedMonth, CreatePurchase, DeletePurchase, UpdatePurchase } from '../../dashboard.actions';
import { AlertService } from '../../../core/services/alert.service';
import { of, throwError } from 'rxjs';
import { DialogService } from '../../../core/services/dialog.service';
import { PurchasesService } from '../../services/purchases.service';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal.component';
import { AutoCompleteComponent } from '../../../shared/components/auto-complete/auto-complete.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<AppState>;
  let alertService: AlertService;
  let purchasesService: PurchasesService;
  const dialogService = {
    confirm: (title, message, successFn) => {
      successFn();
    }
  };

  beforeEach(async(() => {
    purchasesService = jasmine.createSpyObj('PurchasesService', ['create', 'update', 'delete']);
    alertService = jasmine.createSpyObj('AlertService', ['success', 'error']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          dashboard: dashboardReducer
        })
      ],
      declarations: [ HomeComponent, PurchaseModalComponent, AutoCompleteComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: PurchasesService, useValue: purchasesService },
        { provide: AlertService, useValue: alertService },
        { provide: DialogService, useValue: dialogService },
        DatePipe
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal on startNewPurchase', () => {
    spyOn(component.purchaseModal, 'show');

    component.startNewPurchase();

    expect(component.purchaseModal.show).toHaveBeenCalled();
  });

  it('should open modal on startUpdatePurchase', () => {
    spyOn(component.purchaseModal, 'show');

    const purchase: Purchase = {
      id: '1',
      date: '2019-01-10',
      description: 'Descrição',
      total: 10,
      value: 5,
      quantity: 2,
      paid: true
    };

    component.startUpdatePurchase(purchase);

    expect(component.purchaseModal.show).toHaveBeenCalledWith(purchase);
  });

  it('should dispatch Logout action on logout', () => {
    component.logout();

    expect(store.dispatch).toHaveBeenCalledWith(new Logout({ error: '' }));
  });

  it('should dispatch ChangeSelectedMonth action on changeMonth', () => {
    const index = 1;

    component.changeMonth({ index });

    expect(store.dispatch).toHaveBeenCalledWith(new ChangeSelectedMonth({ index }));
  });

  it('should dispatch UpdatePurchase action on togglePaidShopping', fakeAsync(() => {
    const purchase: Purchase = {
      id: '1',
      date: '2019-01-10',
      description: 'Descrição',
      total: 10,
      value: 5,
      quantity: 2,
      paid: true
    };

    (purchasesService.update as jasmine.Spy).and.returnValue(of({ ...purchase, paid: !purchase.paid }));

    component.togglePaidPurchase(purchase);

    tick(3000);

    expect(store.dispatch).toHaveBeenCalledWith(new UpdatePurchase({ purchase: { ...purchase, paid: !purchase.paid }}));
    expect(alertService.success).toHaveBeenCalled();
  }));

  it('should dispatch CreatePurchase or UpdatePurchase actions on finishShopping', fakeAsync(() => {
    spyOn(component.purchaseModal, 'hide');

    const purchase: Purchase = {
      id: '1',
      date: '2019-01-10',
      description: 'Descrição',
      total: 10,
      value: 5,
      quantity: 2,
      paid: true
    };

    (purchasesService.create as jasmine.Spy).and.returnValue(of(purchase));
    (purchasesService.update as jasmine.Spy).and.returnValue(of(purchase));

    component.finishPurchase({ ...purchase, id: undefined });

    tick(3000);

    expect(store.dispatch).toHaveBeenCalledWith(new CreatePurchase({ purchase }));
    expect(alertService.success).toHaveBeenCalled();
    expect(component.purchaseModal.hide).toHaveBeenCalled();

    component.finishPurchase(purchase);

    tick(3000);

    expect(store.dispatch).toHaveBeenCalledWith(new UpdatePurchase({ purchase }));
    expect(alertService.success).toHaveBeenCalled();
    expect(component.purchaseModal.hide).toHaveBeenCalled();
  }));

  it('should dispatch DeletePurchase on startDeleteShopping', fakeAsync(() => {
    const purchase: Purchase = {
      id: '1',
      date: '2019-01-10',
      description: 'Descrição',
      total: 10,
      value: 5,
      quantity: 2,
      paid: true
    };

    (purchasesService.delete as jasmine.Spy).and.returnValue(of(''));

    component.startDeletePurchase(purchase);

    tick(3000);

    expect(store.dispatch).toHaveBeenCalledWith(new DeletePurchase({ id: purchase.id }));
    expect(alertService.success).toHaveBeenCalled();
  }));

  it('should display error alert when request fails', () => {
    const purchase: Purchase = {
      id: '1',
      date: '2019-01-10',
      description: 'Descrição',
      total: 10,
      value: 5,
      quantity: 2,
      paid: true
    };

    (purchasesService.create as jasmine.Spy).and.returnValue(throwError({}));
    (purchasesService.update as jasmine.Spy).and.returnValue(throwError({}));

    component.togglePaidPurchase(purchase);
    component.finishPurchase({ ...purchase, id: undefined });
    component.finishPurchase(purchase);

    expect(alertService.error).toHaveBeenCalledTimes(3);
  });
});

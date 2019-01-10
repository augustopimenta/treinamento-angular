import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { PanelComponent } from './components/panel/panel.component';
import { MonthsPanelComponent } from './components/months-panel/months-panel.component';
import { TotalPanelComponent } from './components/total-panel/total-panel.component';
import { PurchasesPanelComponent } from './components/purchases-panel/purchases-panel.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { SharedModule } from '../shared/shared.module';
import { PurchaseModalComponent } from './components/purchase-modal/purchase-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardEffects } from './dashboard.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './dashboard.reducer';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    PanelComponent,
    MonthsPanelComponent,
    TotalPanelComponent,
    PurchasesPanelComponent,
    LoadingComponent,
    PurchaseModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('dashboard', reducer),
    EffectsModule.forFeature([ DashboardEffects ])
  ],
  providers: [ DatePipe ],
  exports: [ HomeComponent ]
})
export class DashboardModule { }

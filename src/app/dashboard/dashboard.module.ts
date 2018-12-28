import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {PanelComponent} from './components/panel/panel.component';
import { MonthsPanelComponent } from './components/months-panel/months-panel.component';
import { TotalPanelComponent } from './components/total-panel/total-panel.component';
import { PurchasesPanelComponent } from './components/purchases-panel/purchases-panel.component';

@NgModule({
  declarations: [ HomeComponent, HeaderComponent, PanelComponent, MonthsPanelComponent, TotalPanelComponent, PurchasesPanelComponent ],
  imports: [
    CommonModule
  ],
  exports: [ HomeComponent ]
})
export class DashboardModule { }

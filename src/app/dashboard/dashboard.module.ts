import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {PanelComponent} from './components/panel/panel.component';

@NgModule({
  declarations: [ HomeComponent, HeaderComponent, PanelComponent ],
  imports: [
    CommonModule
  ],
  exports: [ HomeComponent ]
})
export class DashboardModule { }

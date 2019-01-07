import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ AlertComponent, DialogComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ AlertComponent, DialogComponent ]
})
export class CoreModule { }

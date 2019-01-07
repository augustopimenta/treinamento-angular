import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { CloseModalDirective } from './components/modal/close-modal.directive';
import { MoneyMaskDirective } from './directives/money-mask.directive';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ModalComponent, CloseModalDirective, MoneyMaskDirective, AutoCompleteComponent ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ ModalComponent, CloseModalDirective, MoneyMaskDirective, AutoCompleteComponent ]
})
export class SharedModule { }

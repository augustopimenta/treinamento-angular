import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { CloseModalDirective } from './components/modal/close-modal.directive';
import { MoneyMaskDirective } from './directives/money-mask.directive';

@NgModule({
  declarations: [ ModalComponent, CloseModalDirective, MoneyMaskDirective ],
  imports: [
    CommonModule
  ],
  exports: [ ModalComponent, CloseModalDirective, MoneyMaskDirective ]
})
export class SharedModule { }

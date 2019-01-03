import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { CloseModalDirective } from './components/modal/close-modal.directive';

@NgModule({
  declarations: [ ModalComponent, CloseModalDirective ],
  imports: [
    CommonModule
  ],
  exports: [ ModalComponent, CloseModalDirective ]
})
export class SharedModule { }

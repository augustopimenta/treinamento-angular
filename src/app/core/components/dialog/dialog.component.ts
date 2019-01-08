import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { DialogService } from '../../services/dialog.service';
import Dialog from '../../models/dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnDestroy {

  dialog: Dialog = {
    title: '',
    message: '',
    success: () => {}
  };

  subscription: Subscription;

  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private dialogService: DialogService) {
    this.subscription = dialogService.data$.subscribe(dialog => {
      this.dialog = dialog;
      this.modal.show();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

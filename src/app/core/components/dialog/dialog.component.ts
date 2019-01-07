import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import Dialog from '../../models/dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {

  @Input() dialog: Dialog;

  @ViewChild(ModalComponent) modal: ModalComponent;

  ngAfterViewInit() {
    this.modal.show();
  }

}

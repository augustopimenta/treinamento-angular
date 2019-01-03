import {
  AfterContentInit,
  AfterViewInit,
  Component, ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output, QueryList,
  ViewChild
} from '@angular/core';
import ModalSize from './modal-size.enum';

import $ from 'jquery';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { CloseModalDirective } from './close-modal.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterContentInit, OnDestroy {

  @Input() header: string;
  @Input() size = ModalSize.MEDIUM;
  @Input() closeable = true;

  @Output() openFinished = new EventEmitter();
  @Output() closeFinished = new EventEmitter();

  @ViewChild('modal') modal: ElementRef<HTMLDivElement>;

  @ContentChildren(CloseModalDirective, { descendants: true, read: ElementRef })
  closeButtons: QueryList<ElementRef<HTMLBaseElement>> = new QueryList();

  ngAfterContentInit() {
    $(this.modal.nativeElement).on('shown.bs.modal', () => {
      this.openFinished.emit();
    });

    $(this.modal.nativeElement).on('hide.bs.modal', () => {
      this.closeFinished.emit();
    });

    this.closeButtons.forEach(button => {
      button.nativeElement.addEventListener('click', this.hide.bind(this), false);
    });
  }

  ngOnDestroy() {
    $(this.modal.nativeElement).off('shown.bs.modal');
    $(this.modal.nativeElement).off('hide.bs.modal');

    this.closeButtons.forEach(button => {
      button.nativeElement.removeEventListener('click', this.hide);
    });

    $(this.modal.nativeElement).modal('dispose');
  }

  show() {
    $(this.modal.nativeElement).modal({
      backdrop: this.closeable ? true : 'static',
      keyboard: this.closeable,
      show: true
    });
  }

  hide() {
    $(this.modal.nativeElement).modal('hide');
  }

}

import { Injectable } from '@angular/core';
import Dialog from '../models/dialog.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private subject = new Subject<Dialog>();

  data$ = this.subject.asObservable();

  confirm(title: string, message: string, success: () => void) {
    this.subject.next({ title, message, success });
  }

}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { LoginRequested } from '../../auth.actions';
import { selectAuthLoading } from '../../auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;

  form: FormGroup;

  loading$ = this.store.pipe(select(selectAuthLoading));

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngAfterViewInit() {
    this.firstInput.nativeElement.focus();
  }

  onSubmit() {
    this.store.dispatch(new LoginRequested(this.form.value));
  }

}

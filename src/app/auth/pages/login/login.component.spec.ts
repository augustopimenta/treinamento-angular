import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { AppState } from '../../../reducers';
import { LoginRequested } from '../../auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoginRequested action on submit', () => {
    const store: Store<AppState> = TestBed.get(Store);

    spyOn(store, 'dispatch');

    const data = {
      email: 'admin@admin.com',
      password: 'admin'
    };

    const email: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    email.value = data.email;
    email.dispatchEvent(new Event('input'));

    const password: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    password.value = data.password;
    password.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(new LoginRequested({ ...data }));
  });
});

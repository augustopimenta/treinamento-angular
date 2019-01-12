import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { RegisterStarted } from '../../auth.actions';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    const authService = jasmine.createSpyObj('AuthService', ['checkUniqueEmail']);

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Custom validations', () => {
    it('sameValue', () => {
      const validResult = RegisterComponent.sameValue(new FormControl('password'))(new FormControl('password'));
      expect(validResult).toBeNull();

      const invalidResult = RegisterComponent.sameValue(new FormControl('password'))(new FormControl('otherValue'));
      expect(invalidResult).toEqual({ sameValue: true });
    });

    it('strongPassword', () => {
      const validResult = RegisterComponent.strongPassword(new FormControl('Ab10fg@#'));
      expect(validResult).toBeNull();

      const invalidResult = RegisterComponent.strongPassword(new FormControl('123'));
      expect(invalidResult).toEqual({ strongPassword: true });
    });

    describe('uniqueEmail async', () => {
      let authService: AuthService;

      beforeEach(() => {
        authService = TestBed.get(AuthService);
      });

      it('valid', async(() => {
        (authService.checkUniqueEmail as jasmine.Spy).and.returnValue(of(true));
        const validResult$ = component.uniqueEmail(new FormControl('admin@admin.com'));
        validResult$.subscribe(result => {
          expect(result).toBeNull();
        });
      }));

      it('invalid', async(() => {
        (authService.checkUniqueEmail as jasmine.Spy).and.returnValue(of(false));
        const invalidResult$ = component.uniqueEmail(new FormControl('admin@admin.com'));
        invalidResult$.subscribe(result => {
          expect(result).toEqual({ uniqueEmail: true });
        });
      }));

      it('error', async(() => {
        (authService.checkUniqueEmail as jasmine.Spy).and.returnValue(throwError(null));
        const invalidResult$ = component.uniqueEmail(new FormControl('admin@admin.com'));
        invalidResult$.subscribe(result => {
          expect(result).toEqual({ uniqueEmailFail: true });
        });
      }));
    });
  });

  it('should emit new password security on input type', () => {
    let strong = null;
    component.passwordSecurity$.subscribe(value => strong = value);

    const password = fixture.nativeElement.querySelector('#password');
    password.value = 'Bat2t1nh@';
    password.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(strong).toBe(3);
  });

  it('should not dispatch action when form is empty', () => {
    spyOn(component['store'], 'dispatch');

    component.onSubmit();

    expect(component['store'].dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch RegisterStarted action on submit valid form', fakeAsync(() => {
    const data = {
      name: 'Augusto Pimenta',
      email: 'augusto@pimenta.com',
      password: 'Aa11@@',
      passwordAgain: 'Aa11@@',
      admin: true
    };

    spyOn(component['store'], 'dispatch');

    const authService: AuthService = TestBed.get(AuthService);
    (authService.checkUniqueEmail as jasmine.Spy).and.returnValue(of(true));

    component.form.setValue(data);

    tick(500);

    fixture.detectChanges();

    component.onSubmit();

    expect(component['store'].dispatch).toHaveBeenCalledWith(new RegisterStarted({ user: data }));
  }));
});

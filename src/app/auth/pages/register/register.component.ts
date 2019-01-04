import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import PassSecurity from './pass-security.enum';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;

  form: FormGroup;

  name = new FormControl('', [ Validators.required ]);
  email = new FormControl('', [ Validators.required, Validators.email ]);
  password = new FormControl('', [ Validators.required, RegisterComponent.strongPassword ]);
  passwordAgain = new FormControl('', [ Validators.required, RegisterComponent.sameValue(this.password) ]);
  admin = new FormControl(false);

  passwordSecurity$ = this.password.valueChanges.pipe(
    startWith(''),
    map(pass => RegisterComponent.checkPasswordSecurity(pass))
  );

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      passwordAgain: this.passwordAgain,
      admin: this.admin
    });
  }

  static sameValue(otherControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl) => {
      return !control.value || otherControl.value === control.value ? null : { sameValue: true };
    };
  }

  static checkPasswordSecurity(password: string): PassSecurity {
    let security = 0;

    if (/[0-9]+/.test(password) && /[A-Z]+/.test(password) && /[a-z]+/.test(password)) {
      security++;
    }

    if (/[#@%^&*()_+!~?]+/.test(password)) {
      security++;
    }

    if (password.length >= 6) {
      security++;
    } else {
      security = Math.max(0, security - 1);
    }

    return security;
  }

  static strongPassword(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    return RegisterComponent.checkPasswordSecurity(control.value) >= PassSecurity.STRONG ? null : { strongPassword: true };
  }

  ngAfterViewInit() {
    this.firstInput.nativeElement.focus();
  }

}

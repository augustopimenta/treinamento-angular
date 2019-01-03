import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('firstInput') firstInput: ElementRef<HTMLInputElement>;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngAfterViewInit() {
    this.firstInput.nativeElement.focus();
  }

  onSubmit() {
    console.log(this.form.value);
  }

}

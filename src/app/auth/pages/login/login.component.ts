import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  identification: string;
  asyncIdentification: string;

  subscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.identification = id;

    this.subscription = this.route.paramMap.pipe(
      map(param => param.get('id'))
    ).subscribe(paramId => {
      this.asyncIdentification = paramId;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

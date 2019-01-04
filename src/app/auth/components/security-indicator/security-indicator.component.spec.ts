import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityIndicatorComponent } from './security-indicator.component';

describe('SecurityIndicatorComponent', () => {
  let component: SecurityIndicatorComponent;
  let fixture: ComponentFixture<SecurityIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

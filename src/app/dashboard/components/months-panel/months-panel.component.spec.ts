import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsPanelComponent } from './months-panel.component';

describe('MonthsPanelComponent', () => {
  let component: MonthsPanelComponent;
  let fixture: ComponentFixture<MonthsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('TODO');
});

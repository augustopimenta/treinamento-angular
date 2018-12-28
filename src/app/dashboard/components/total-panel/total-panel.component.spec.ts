import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPanelComponent } from './total-panel.component';

describe('TotalPanelComponent', () => {
  let component: TotalPanelComponent;
  let fixture: ComponentFixture<TotalPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

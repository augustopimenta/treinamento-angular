import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesPanelComponent } from './purchases-panel.component';

describe('PurchasesPanelComponent', () => {
  let component: PurchasesPanelComponent;
  let fixture: ComponentFixture<PurchasesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('TODO');
});

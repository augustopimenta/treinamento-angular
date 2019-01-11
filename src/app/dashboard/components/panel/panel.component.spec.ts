import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <app-panel>
      <button header>Test</button>
      <span>Content</span>
    </app-panel>
  `
})
class TestComponent {}

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;
  let testFixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelComponent, TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    testFixture = TestBed.createComponent(TestComponent);

    component = fixture.componentInstance;
    component.header = 'Title';
    component.description = 'Description';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and description value', () => {
    const title = fixture.nativeElement.querySelector('.left h1').textContent;
    const description = fixture.nativeElement.querySelector('.left p').textContent;

    expect(title).toBe('Title');
    expect(description).toBe('Description');
  });

  it('should display inner content with projection', () => {
    const button = testFixture.nativeElement.querySelector('.right button');
    const content = testFixture.nativeElement.querySelector('.content span');

    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Test');

    expect(content).toBeTruthy();
    expect(content.textContent).toBe('Content');
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityIndicatorComponent } from './security-indicator.component';
import PassSecurity from '../../pages/register/pass-security.enum';

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
    component.strong = PassSecurity.WEAK;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display strong description indicator', () => {
    const getDesc = () => {
      return fixture.nativeElement.querySelector('.description').textContent;
    };

    expect(getDesc()).toBe('Fraca');

    component.strong = PassSecurity.MEDIUM;
    fixture.detectChanges();

    expect(getDesc()).toBe('Mediana');

    component.strong = PassSecurity.STRONG;
    fixture.detectChanges();

    expect(getDesc()).toBe('Forte');
  });

  it('should display little circles with color based on the password strength', () => {
    const getCircleColorsCount = color => {
      const indicators = Array.prototype.slice.call(fixture.nativeElement.querySelectorAll('.indicator'));
      return indicators
        .map((indicator: HTMLElement) => indicator.style.backgroundColor)
        .filter(backgroundColor => backgroundColor === color)
        .length;
    };

    component.strong = PassSecurity.VERY_STRONG;
    fixture.detectChanges();

    expect(getCircleColorsCount('green')).toBe(4);

    component.strong = PassSecurity.WEAK;
    fixture.detectChanges();

    expect(getCircleColorsCount('red')).toBe(1);
  });
});

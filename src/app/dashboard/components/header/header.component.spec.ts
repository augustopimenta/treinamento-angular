import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.userPhoto = 'https://angular.io/assets/images/logos/angular/angular.svg';
    component.userName = 'First Second Name';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user photo and name values', () => {
    const photo: HTMLImageElement = fixture.nativeElement.querySelector('img');
    const banner = fixture.nativeElement.querySelector('.banner h1').textContent;
    const profile = fixture.nativeElement.querySelector('.profile span').textContent;

    expect(photo.src).toBe('https://angular.io/assets/images/logos/angular/angular.svg');

    expect(banner).toBe('Olá First');
    expect(profile).toBe('First Second Name');
  });

  it('should emit logout event when click exit button', () => {
    spyOn(component.logout, 'emit');

    const logoutButton = fixture.nativeElement.querySelector('.exit');
    logoutButton.click();

    expect(component.logout.emit).toHaveBeenCalled();
  });
});

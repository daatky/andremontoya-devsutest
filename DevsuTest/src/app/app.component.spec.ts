import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppBarStyle } from '@shared/enum/components/appbarstyle.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        SharedModule,
        HttpClientModule
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    console.log('AQUII ');
    expect(component).toBeTruthy();
  });

  it(`should have as title 'DevsuTest'`, () => {
    expect(component.title).toEqual('DevsuTest');
  });

  it('should initialize appBarModel on ngOnInit', () => {
    component.ngOnInit();
    expect(component.appBarModel).toEqual({
      show: true,
      text: 'BANCO',
      iconName: 'payments',
      style: AppBarStyle.DEFAULT
    });
  });
});

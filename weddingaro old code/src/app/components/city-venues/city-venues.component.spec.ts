import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityVenuesComponent } from './city-venues.component';

describe('CityVenuesComponent', () => {
  let component: CityVenuesComponent;
  let fixture: ComponentFixture<CityVenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityVenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

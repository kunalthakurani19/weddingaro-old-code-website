import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrideCityVenuesComponent } from './bride-city-venues.component';

describe('BrideCityVenuesComponent', () => {
  let component: BrideCityVenuesComponent;
  let fixture: ComponentFixture<BrideCityVenuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrideCityVenuesComponent]
    });
    fixture = TestBed.createComponent(BrideCityVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

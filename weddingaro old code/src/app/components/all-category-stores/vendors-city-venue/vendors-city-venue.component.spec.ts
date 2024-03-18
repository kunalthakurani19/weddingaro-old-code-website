import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsCityVenueComponent } from './vendors-city-venue.component';

describe('VendorsCityVenueComponent', () => {
  let component: VendorsCityVenueComponent;
  let fixture: ComponentFixture<VendorsCityVenueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorsCityVenueComponent]
    });
    fixture = TestBed.createComponent(VendorsCityVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

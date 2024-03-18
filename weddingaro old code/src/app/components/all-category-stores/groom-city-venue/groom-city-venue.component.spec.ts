import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroomCityVenueComponent } from './groom-city-venue.component';

describe('GroomCityVenueComponent', () => {
  let component: GroomCityVenueComponent;
  let fixture: ComponentFixture<GroomCityVenueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroomCityVenueComponent]
    });
    fixture = TestBed.createComponent(GroomCityVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

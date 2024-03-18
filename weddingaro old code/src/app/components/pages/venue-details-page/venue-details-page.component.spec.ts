import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailsPageComponent } from './venue-details-page.component';

describe('VenueDetailsPageComponent', () => {
  let component: VenueDetailsPageComponent;
  let fixture: ComponentFixture<VenueDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenueDetailsPageComponent]
    });
    fixture = TestBed.createComponent(VenueDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

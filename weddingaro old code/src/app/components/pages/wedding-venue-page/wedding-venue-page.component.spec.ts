import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingVenuePageComponent } from './wedding-venue-page.component';

describe('WeddingVenuePageComponent', () => {
  let component: WeddingVenuePageComponent;
  let fixture: ComponentFixture<WeddingVenuePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingVenuePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingVenuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

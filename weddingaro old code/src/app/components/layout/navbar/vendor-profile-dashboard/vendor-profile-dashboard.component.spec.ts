import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProfileDashboardComponent } from './vendor-profile-dashboard.component';

describe('VendorProfileDashboardComponent', () => {
  let component: VendorProfileDashboardComponent;
  let fixture: ComponentFixture<VendorProfileDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorProfileDashboardComponent]
    });
    fixture = TestBed.createComponent(VendorProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

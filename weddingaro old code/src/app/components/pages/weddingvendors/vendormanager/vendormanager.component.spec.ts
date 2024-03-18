import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendormanagerComponent } from './vendormanager.component';

describe('VendormanagerComponent', () => {
  let component: VendormanagerComponent;
  let fixture: ComponentFixture<VendormanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendormanagerComponent]
    });
    fixture = TestBed.createComponent(VendormanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

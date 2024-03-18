import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTableComponent } from './vendor-table.component';

describe('VendorTableComponent', () => {
  let component: VendorTableComponent;
  let fixture: ComponentFixture<VendorTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorTableComponent]
    });
    fixture = TestBed.createComponent(VendorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
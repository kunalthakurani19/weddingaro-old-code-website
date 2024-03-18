import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingVendorsComponent } from './wedding-vendors.component';

describe('WeddingVendorsComponent', () => {
  let component: WeddingVendorsComponent;
  let fixture: ComponentFixture<WeddingVendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeddingVendorsComponent]
    });
    fixture = TestBed.createComponent(WeddingVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorelementsComponent } from './vendorelements.component';

describe('VendorelementsComponent', () => {
  let component: VendorelementsComponent;
  let fixture: ComponentFixture<VendorelementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorelementsComponent]
    });
    fixture = TestBed.createComponent(VendorelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

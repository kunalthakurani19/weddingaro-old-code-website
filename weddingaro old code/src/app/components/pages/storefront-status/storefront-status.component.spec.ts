import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefrontStatusComponent } from './storefront-status.component';

describe('StorefrontStatusComponent', () => {
  let component: StorefrontStatusComponent;
  let fixture: ComponentFixture<StorefrontStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorefrontStatusComponent]
    });
    fixture = TestBed.createComponent(StorefrontStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

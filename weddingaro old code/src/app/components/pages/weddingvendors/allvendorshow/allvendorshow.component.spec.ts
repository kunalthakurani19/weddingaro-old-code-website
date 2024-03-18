import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllvendorshowComponent } from './allvendorshow.component';

describe('AllvendorshowComponent', () => {
  let component: AllvendorshowComponent;
  let fixture: ComponentFixture<AllvendorshowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllvendorshowComponent]
    });
    fixture = TestBed.createComponent(AllvendorshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetscreenComponent } from './budgetscreen.component';

describe('BudgetscreenComponent', () => {
  let component: BudgetscreenComponent;
  let fixture: ComponentFixture<BudgetscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetscreenComponent]
    });
    fixture = TestBed.createComponent(BudgetscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

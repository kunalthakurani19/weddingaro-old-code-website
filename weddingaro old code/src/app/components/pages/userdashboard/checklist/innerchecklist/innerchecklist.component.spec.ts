import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerchecklistComponent } from './innerchecklist.component';

describe('InnerchecklistComponent', () => {
  let component: InnerchecklistComponent;
  let fixture: ComponentFixture<InnerchecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerchecklistComponent]
    });
    fixture = TestBed.createComponent(InnerchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

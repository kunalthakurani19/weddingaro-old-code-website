import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewstepsComponent } from './reviewsteps.component';

describe('ReviewstepsComponent', () => {
  let component: ReviewstepsComponent;
  let fixture: ComponentFixture<ReviewstepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewstepsComponent]
    });
    fixture = TestBed.createComponent(ReviewstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

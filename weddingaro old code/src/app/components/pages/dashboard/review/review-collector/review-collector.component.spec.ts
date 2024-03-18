import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCollectorComponent } from './review-collector.component';

describe('ReviewCollectorComponent', () => {
  let component: ReviewCollectorComponent;
  let fixture: ComponentFixture<ReviewCollectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewCollectorComponent]
    });
    fixture = TestBed.createComponent(ReviewCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

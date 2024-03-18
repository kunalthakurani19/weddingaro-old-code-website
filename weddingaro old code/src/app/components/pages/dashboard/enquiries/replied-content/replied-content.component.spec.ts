import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliedContentComponent } from './replied-content.component';

describe('RepliedContentComponent', () => {
  let component: RepliedContentComponent;
  let fixture: ComponentFixture<RepliedContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepliedContentComponent]
    });
    fixture = TestBed.createComponent(RepliedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

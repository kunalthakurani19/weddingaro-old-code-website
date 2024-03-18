import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentcomponentComponent } from './experimentcomponent.component';

describe('ExperimentcomponentComponent', () => {
  let component: ExperimentcomponentComponent;
  let fixture: ComponentFixture<ExperimentcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentcomponentComponent]
    });
    fixture = TestBed.createComponent(ExperimentcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

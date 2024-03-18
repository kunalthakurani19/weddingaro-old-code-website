import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyweddingComponent } from './mywedding.component';

describe('MyweddingComponent', () => {
  let component: MyweddingComponent;
  let fixture: ComponentFixture<MyweddingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyweddingComponent]
    });
    fixture = TestBed.createComponent(MyweddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

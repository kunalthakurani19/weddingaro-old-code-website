import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyweddingContentComponent } from './mywedding-content.component';

describe('MyweddingContentComponent', () => {
  let component: MyweddingContentComponent;
  let fixture: ComponentFixture<MyweddingContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyweddingContentComponent]
    });
    fixture = TestBed.createComponent(MyweddingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

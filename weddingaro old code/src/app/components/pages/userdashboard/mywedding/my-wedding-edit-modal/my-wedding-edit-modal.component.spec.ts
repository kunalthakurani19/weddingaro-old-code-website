import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWeddingEditModalComponent } from './my-wedding-edit-modal.component';

describe('MyWeddingEditModalComponent', () => {
  let component: MyWeddingEditModalComponent;
  let fixture: ComponentFixture<MyWeddingEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyWeddingEditModalComponent]
    });
    fixture = TestBed.createComponent(MyWeddingEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

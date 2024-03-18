import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorybudgetsideComponent } from './categorybudgetside.component';

describe('CategorybudgetsideComponent', () => {
  let component: CategorybudgetsideComponent;
  let fixture: ComponentFixture<CategorybudgetsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorybudgetsideComponent]
    });
    fixture = TestBed.createComponent(CategorybudgetsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

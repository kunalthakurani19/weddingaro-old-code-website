import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltercontentComponent } from './filtercontent.component';

describe('FiltercontentComponent', () => {
  let component: FiltercontentComponent;
  let fixture: ComponentFixture<FiltercontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltercontentComponent]
    });
    fixture = TestBed.createComponent(FiltercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

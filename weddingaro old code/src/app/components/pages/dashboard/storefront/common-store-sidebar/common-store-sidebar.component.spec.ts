import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStoreSidebarComponent } from './common-store-sidebar.component';

describe('CommonStoreSidebarComponent', () => {
  let component: CommonStoreSidebarComponent;
  let fixture: ComponentFixture<CommonStoreSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonStoreSidebarComponent]
    });
    fixture = TestBed.createComponent(CommonStoreSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

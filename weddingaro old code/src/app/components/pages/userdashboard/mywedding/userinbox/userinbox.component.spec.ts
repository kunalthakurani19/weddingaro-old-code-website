import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinboxComponent } from './userinbox.component';

describe('UserinboxComponent', () => {
  let component: UserinboxComponent;
  let fixture: ComponentFixture<UserinboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserinboxComponent]
    });
    fixture = TestBed.createComponent(UserinboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

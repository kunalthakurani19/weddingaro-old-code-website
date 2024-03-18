import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCollapseComponent } from './custom-collapse.component';

describe('CustomCollapseComponent', () => {
  let component: CustomCollapseComponent;
  let fixture: ComponentFixture<CustomCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCollapseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

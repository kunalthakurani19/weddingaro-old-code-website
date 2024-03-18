import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeedingvendorsnavComponent } from './weedingvendorsnav.component';

describe('WeedingvendorsnavComponent', () => {
  let component: WeedingvendorsnavComponent;
  let fixture: ComponentFixture<WeedingvendorsnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeedingvendorsnavComponent]
    });
    fixture = TestBed.createComponent(WeedingvendorsnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

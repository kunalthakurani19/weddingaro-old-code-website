import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroomsComponent } from './grooms.component';

describe('GroomsComponent', () => {
  let component: GroomsComponent;
  let fixture: ComponentFixture<GroomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroomsComponent]
    });
    fixture = TestBed.createComponent(GroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

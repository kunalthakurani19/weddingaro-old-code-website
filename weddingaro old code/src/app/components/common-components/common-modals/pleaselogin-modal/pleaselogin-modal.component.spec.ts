import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseloginModalComponent } from './pleaselogin-modal.component';

describe('PleaseloginModalComponent', () => {
  let component: PleaseloginModalComponent;
  let fixture: ComponentFixture<PleaseloginModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PleaseloginModalComponent]
    });
    fixture = TestBed.createComponent(PleaseloginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

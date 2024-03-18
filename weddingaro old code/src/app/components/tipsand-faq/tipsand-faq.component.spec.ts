import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsandFAQComponent } from './tipsand-faq.component';

describe('TipsandFAQComponent', () => {
  let component: TipsandFAQComponent;
  let fixture: ComponentFixture<TipsandFAQComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipsandFAQComponent]
    });
    fixture = TestBed.createComponent(TipsandFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

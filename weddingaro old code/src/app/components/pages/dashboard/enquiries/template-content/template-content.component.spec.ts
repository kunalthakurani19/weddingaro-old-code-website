import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateContentComponent } from './template-content.component';

describe('TemplateContentComponent', () => {
  let component: TemplateContentComponent;
  let fixture: ComponentFixture<TemplateContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateContentComponent]
    });
    fixture = TestBed.createComponent(TemplateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingContentComponent } from './setting-content.component';

describe('SettingContentComponent', () => {
  let component: SettingContentComponent;
  let fixture: ComponentFixture<SettingContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingContentComponent]
    });
    fixture = TestBed.createComponent(SettingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

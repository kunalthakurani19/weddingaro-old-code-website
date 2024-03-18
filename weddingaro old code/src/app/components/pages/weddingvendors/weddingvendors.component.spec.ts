import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingvendorsComponent } from './weddingvendors.component';

describe('WeddingvendorsComponent', () => {
  let component: WeddingvendorsComponent;
  let fixture: ComponentFixture<WeddingvendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeddingvendorsComponent]
    });
    fixture = TestBed.createComponent(WeddingvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

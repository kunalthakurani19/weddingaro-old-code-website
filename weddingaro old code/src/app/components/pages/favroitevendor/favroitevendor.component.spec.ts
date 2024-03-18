import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavroitevendorComponent } from './favroitevendor.component';

describe('FavroitevendorComponent', () => {
  let component: FavroitevendorComponent;
  let fixture: ComponentFixture<FavroitevendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavroitevendorComponent]
    });
    fixture = TestBed.createComponent(FavroitevendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

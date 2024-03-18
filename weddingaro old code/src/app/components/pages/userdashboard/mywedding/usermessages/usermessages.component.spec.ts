import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermessagesComponent } from './usermessages.component';

describe('UsermessagesComponent', () => {
  let component: UsermessagesComponent;
  let fixture: ComponentFixture<UsermessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsermessagesComponent]
    });
    fixture = TestBed.createComponent(UsermessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

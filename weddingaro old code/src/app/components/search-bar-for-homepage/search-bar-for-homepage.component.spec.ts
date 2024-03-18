import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarForHomepageComponent } from './search-bar-for-homepage.component';

describe('SearchBarForHomepageComponent', () => {
  let component: SearchBarForHomepageComponent;
  let fixture: ComponentFixture<SearchBarForHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarForHomepageComponent]
    });
    fixture = TestBed.createComponent(SearchBarForHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

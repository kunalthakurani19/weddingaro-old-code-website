import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosDetailsDialogComponent } from './photos-details-dialog.component';

describe('PhotosDetailsDialogComponent', () => {
  let component: PhotosDetailsDialogComponent;
  let fixture: ComponentFixture<PhotosDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(PhotosDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

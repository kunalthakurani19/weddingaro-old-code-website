import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhotosDetailsDialogComponent } from '../photos-details-dialog/photos-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VendorService } from 'src/app/services/vendor.service';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/common-components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})

export class PhotosComponent implements OnInit, OnDestroy {
  photos: any = [];
  maxSize: number = 5; // Max file size in MB
  selectedImages: File[] = [];
  storeId: any = '';
  storeSubscription = new Subscription();
  constructor(private toastr: ToastrService, private dialog: MatDialog, private vendorService: VendorService) {

  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.storeId = localStorage.getItem('storeId');
    this.getPhotosData(this.storeId || localStorage.getItem('storetoken'))
  }

  onFilesSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      this.handleFilesInput(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const dataTransfer = event.dataTransfer;

    if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
      const files = dataTransfer.files;
      this.handleFilesInput(files);
    }
  }


  private handleFilesInput(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if the file is an image
      if (!file.type.startsWith('image')) {
        this.toastr.error('Only image files are allowed.');
        return;
      }

      // Check the file size (in bytes)
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > this.maxSize) {
        this.toastr.error('File size should be under 5 MB.');
        return;
      }

      this.selectedImages.push(file);
    }

    this.openDialog();
  }



  openDialog() {
    if (this.selectedImages.length > 0) {
      const formData = new FormData();
      formData.append('key', 'photos');
      formData.append('title', '');
      formData.append('description', '');

      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('storemedia', this.selectedImages[i]);
      }

      formData.append('storeToken', this.storeId || localStorage.getItem('storetoken'));

      this.vendorService.createMultiPartStore(formData).subscribe(res => {
        this.getPhotosData(this.storeId || localStorage.getItem('storetoken'));
        // Clear the selected images array after upload
        this.selectedImages = [];
      });
    }
  }




  getPhotosData(id: string) {
    this.vendorService.getStoreById('photos', id).subscribe((res: any) => {
      let data = JSON.parse(JSON.stringify(res?.stores[0]?.store?.photos || []))
      this.photos = data;
    })
  }

  deletePhoto(id: string) {
    let payload = {
      key: 'photos',
      storeToken: this.storeId || localStorage.getItem('storetoken'),
      uuid: id
    }
    this.vendorService.deleteStorePhoto(payload).subscribe((res: any) => {
      this.getPhotosData(this.storeId || localStorage.getItem('storetoken'))
    })
  }

  confirmDelete(storeId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the user clicks "Yes" in the confirmation dialog

        this.deletePhoto(storeId);
      }
    });
  }

}





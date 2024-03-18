import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhotosDetailsDialogComponent } from '../photos-details-dialog/photos-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit , OnDestroy {
    videos:any =[];
    maxSize: number = 500; // Max file size in MB
    selectedVideo!:File;
    storeId:any='';
    storeSubscription = new Subscription();
    constructor(private toastr: ToastrService,private dialog: MatDialog,private vendorService:VendorService) {

     }
    ngOnDestroy(): void {
    }
    ngOnInit(): void {
      this.storeId = localStorage.getItem('storeId');
      this.getVideossData(this.storeId)
    }

    onFileSelected(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0];
      if (file) {
        this.handleFileInput(file);
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
      if (dataTransfer && dataTransfer.files.length > 0) {
        const file = dataTransfer.files[0];
        this.handleFileInput(file);
      }
    }

    private handleFileInput(file: File): void {
      // Check if the file is an image
      if (!file.type.startsWith('video')) {
        this.toastr.error('Only image files are allowed.');
        return;
      }

      // Check the file size (in bytes)
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > this.maxSize) {
        this.toastr.error('File size should be under 5 MB.');
        return;
      }

      // File is valid, you can now handle the file upload
      // If you want to display the image or perform any other operation, you can use FileReader
      this.selectedVideo = file
      if(this.selectedVideo){
        this.openDialog();
      }
    }


    openDialog() {

      if (this.selectedVideo) {

        const dialogRef = this.dialog.open(PhotosDetailsDialogComponent, {
          width: '400px',
          data: {
            title: '',
            description: ''
          }
        });

        dialogRef.afterClosed().subscribe((result:any) => {
          if (result) {
            const formData = new FormData();
            formData.append('key','video');
            formData.append('title', result.title);
            formData.append('description',result.description) ;
            formData.append('storemedia',this.selectedVideo) ;
            formData.append('storeToken',this.storeId || localStorage.getItem('storetoken'));
            this.vendorService.createMultiPartStore(formData).subscribe(res=>{
              this.getVideossData(this.storeId ||  localStorage.getItem('storetoken'))
            })
          }
        });
      }
      }
      getVideossData(id:string){
        this.vendorService.getStoreById('videos',id).subscribe((res:any)=>{
          console.log(res)
          let data = JSON.parse(JSON.stringify(res?.stores[0]?.store?.video || []))
          this.videos = data;
        })
      }
      deleteVideo(id:string){
        let payload = {
          key:'video',
          storeToken: this.storeId,
          uuid:id
        }
        this.vendorService.deleteStorePhoto(payload).subscribe((res:any)=>{
          this.getVideossData(this.storeId ||  localStorage.getItem('storetoken'))
        })
      }
    }

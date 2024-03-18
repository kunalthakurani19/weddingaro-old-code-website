import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-photos-details-dialog',
  templateUrl: './photos-details-dialog.component.html',
  styleUrls: ['./photos-details-dialog.component.scss']
})
export class PhotosDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PhotosDetailsDialogComponent>,private formBuilder: FormBuilder) {}
  photoForm!: FormGroup;


  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      title: [this.data.title || '', Validators.required],
      description: [this.data.description || '', Validators.required]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.photoForm.valid) {
      const formData = this.photoForm.value;
      this.dialogRef.close(formData);
    }
  }

}

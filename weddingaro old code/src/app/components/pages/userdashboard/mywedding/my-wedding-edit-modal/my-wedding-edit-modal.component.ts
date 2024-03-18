import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-wedding-edit-modal',
  templateUrl: './my-wedding-edit-modal.component.html',
  styleUrls: ['./my-wedding-edit-modal.component.scss']
})
export class MyWeddingEditModalComponent implements OnInit {
  weddingForm!:FormGroup;

  constructor(public dialogRef: MatDialogRef<MyWeddingEditModalComponent>,private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any ){
    this.createForm();
  }
  ngOnInit(): void {
    console.log(this.data)
    this.weddingForm.patchValue(this.data)
  }
  closeDialog() {
    this.dialogRef.close();
  }
  selectedOption: string = '';
  createForm(){
    this.weddingForm = this.formBuilder.group({
      name:[],
      partnerName:[''],
      sector:[''],
      parentsector:[''],
    })
  }
  onSubmit(): void {
    console.log(this.weddingForm.value)
      this.dialogRef.close({isUpdate:!this.weddingForm.pristine , data:this.weddingForm.value});
  }
}

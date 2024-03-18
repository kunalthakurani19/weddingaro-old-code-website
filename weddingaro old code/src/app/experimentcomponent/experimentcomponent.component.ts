import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experimentcomponent',
  templateUrl: './experimentcomponent.component.html',
  styleUrls: ['./experimentcomponent.component.scss']
})
export class ExperimentcomponentComponent {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}

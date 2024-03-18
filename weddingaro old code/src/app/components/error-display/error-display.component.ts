import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// @Component({
//   selector: 'app-error-display',
//   templateUrl: './error-display.component.html',
//   template: `
//     <div *ngIf="shouldShowErrors()" class="invalid-feedback">
//       {{ getErrorMessage() }}
//     </div>
//   `,
//   styleUrls: ['./error-display.component.scss']
// })

@Component({
  selector: 'app-error-display',
  template: `
    <div *ngIf="shouldShowErrors()" class="invalid-feedback">
      {{ getErrorMessage() }}
    </div>
  `,
})

export class ErrorDisplayComponent {
  @Input() control!: AbstractControl | null;

  shouldShowErrors(): boolean {
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string | null {
    if (!this.control) {
      return null;
    }

    if (this.control.hasError('required')) {
      return 'This field is required';
    }

    if (this.control.hasError('email')) {
      return 'Please enter a valid email address';
    }

    // Add more conditions for other validators as needed

    return null;
  }
}

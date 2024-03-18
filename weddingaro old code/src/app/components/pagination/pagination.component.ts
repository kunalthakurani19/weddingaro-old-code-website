import {  Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() selectedButton: number = 1;
  @Input() totalPages: number = 1;

  @Output() onClickButton = new EventEmitter<number | 'previous' | 'next'>();

  isPreviousButtonDisabled(): boolean {
    return this.selectedButton === 1;
  }

  isNextButtonDisabled(): boolean {
    return this.selectedButton === this.totalPages;
  }

  onClickButtonHandler(buttonType: 'previous' | 'next' | number) {
    this.onClickButton.emit(buttonType);
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }
}

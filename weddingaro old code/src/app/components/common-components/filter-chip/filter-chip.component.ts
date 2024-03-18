import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-chip',
  templateUrl: './filter-chip.component.html',
  styleUrls: ['./filter-chip.component.css']
})
export class FilterChipComponent {
  @Input() filterText: string = '';
  @Output() remove = new EventEmitter<void>();

  removeFilter() {
    this.remove.emit();
  }
}

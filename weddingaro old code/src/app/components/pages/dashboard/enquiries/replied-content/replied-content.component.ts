import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-replied-content',
  templateUrl: './replied-content.component.html',
  styleUrls: ['./replied-content.component.scss']
})
export class RepliedContentComponent {
  public Editor = ClassicEditor;
  selected = 'option2';

  isRead: boolean = true;

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

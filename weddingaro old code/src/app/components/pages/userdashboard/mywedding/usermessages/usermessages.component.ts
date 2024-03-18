import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Socket } from 'ngx-socket-io';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from 'src/app/services/chatService/chat.service';

@Component({
  selector: 'app-usermessages',
  templateUrl: './usermessages.component.html',
  styleUrls: ['./usermessages.component.scss']
})
export class UsermessagesComponent {
  public Editor = ClassicEditor;
  selected = 'option2';

  isRead: boolean = true;

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }

  status = [
    { title: 'Vendor messages', count: 2, color: '#F3B640', route: 'replied' },
    { title: 'Private messages', count: 2, color: '#F3B640', route: 'replied' },
    { title: 'Notifications', count: 2, color: '#F3B640', route: 'replied' },
    { title: 'Admin messages', count: 2, color: '#F3B640', route: 'replied' },
  ];
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  sender!: string;
  receiver!: string;
  roomId!: string;
  message!: string;
  chatDetails: any;
  messages: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Set sender, receiver, and roomId as needed
    this.sender = 'Sender';
    this.receiver = 'Receiver';
    this.roomId = 'Room123';

    // Join the chat
    this.chatService.joinChat(this.sender, this.receiver, this.roomId);

    // Get chat details
    this.chatService.onChatDetails().subscribe((details) => {
      this.chatDetails = details;
    });

    // Listen for incoming messages
    this.chatService.onMessageReceived().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.message, this.sender, this.chatDetails.chatid, this.roomId);
      this.message = '';
    }
  }

}

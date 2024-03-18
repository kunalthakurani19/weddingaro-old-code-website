import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://65.1.112.21:3100'); 
  }

  joinChat(sender: string, receiver: string, roomId: string): void {
    this.socket.emit('user-joined', sender, receiver, roomId);
  }

  onChatDetails(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('chat-details', (details) => {
        observer.next(details);
      });
    });
  }

  sendMessage(message: string, sender: string, chatId: string, roomId: string): void {
    this.socket.emit('new-message', message, sender, chatId, roomId);
  }

  onMessageReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message-recive', (message) => {
        observer.next(message);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<string>();

  public messages$ = this.messageSubject.asObservable();
  private isConnected: boolean = false;
  connect() {
    if (this.isConnected) {
      console.warn('WebSocket is already connected.');
      return;
    }
    this.isConnected = true;

    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      console.log('1 client ws connected to WebSocket server ');
    };
    this.socket.onmessage = (event) => {
      console.log('2client ws Received message: ', event, event.data);
      this.messageSubject.next(event.data);
    };

    this.socket.onclose = () => {
      console.log('3 client ws Disconnected');
    };
  }
  sendMessage(message: string) {
    console.log('8 service: Sending message: ', message);
    this.socket.send(message);
  }

  close() {
    this.socket.close();
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WebSocketService } from '../shared/services/webSocket/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Consumer2WebSocket } from '../consumer2-web-socket/consumer2-web-socket';

@Component({
  selector: 'app-chat-web-socket',
  imports: [CommonModule, FormsModule, Consumer2WebSocket],
  templateUrl: './chat-web-socket.html',
  styleUrl: './chat-web-socket.scss',
  standalone: true,
})
export class ChatWebSocket implements OnInit {
  msg: string = '';
  msgs: string[] = [];
  //msgs = signal<string[]>([]);

  constructor(
    private webSocketService: WebSocketService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.webSocketService.connect();
    this.webSocketService.messages$.subscribe((message) => {
      console.log('4 component: Received message in component: ', message);
      this.msgs.push(message);
      this.cd.markForCheck(); // Manually trigger change detection to update the view
      // this.msgs = [...this.msgs, message];
    });
  }

  send() {
    if (this.msg.trim()) {
      this.webSocketService.sendMessage(this.msg);
      this.msg = '';
    }
  }
  close() {
    this.webSocketService.close();
  }
}

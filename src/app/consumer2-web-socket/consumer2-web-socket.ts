import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WebSocketService } from '../shared/services/webSocket/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumer2-web-socket',
  imports: [CommonModule, FormsModule],
  templateUrl: './consumer2-web-socket.html',
  styleUrl: './consumer2-web-socket.scss',
  standalone: true,
})
export class Consumer2WebSocket implements OnInit {
  msg: string = '';
  msgs: string[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    //this.webSocketService.connect();
    this.webSocketService.messages$.subscribe((message) => {
      console.log('4 consumer2: Received message in component: ', message);
      console.log('5 consumer2: before array msg: ', this.msg, this.msgs);
      this.msg = message + ' from consumer2';
      this.msgs.push(message);
      console.log('5 consumer2: after array msg: ', this.msg, this.msgs);
    });
  }

  close() {
    this.webSocketService.close();
  }
}

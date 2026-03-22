import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private router: Router) {}
  protected readonly title = signal('ngProject');

  openChat() {
    // Logic to open the chat interface
    console.log('Chat interface opened');
    this.router.navigate(['/chat']);
  }

  openGitDiffSummary() {
    // Logic to open the AI Git Diff Summary interface
    console.log('AI Git Diff Summary interface opened');
    this.router.navigate(['/ai-gitdiff-summary']);
  }
  openGitDiffStream() {
    // Logic to open the AI Git Diff Stream interface
    console.log('AI Git Diff Stream interface opened');
    this.router.navigate(['/ai-gitdiff-stream']);
  }
  openWebSocketChat() {
    // Logic to open the WebSocket Chat interface
    console.log('WebSocket Chat interface opened');
    this.router.navigate(['/chat-web-socket']);
  }
  openLifecycleHooks() {
    // Logic to open the Lifecycle Hooks interface
    console.log('Lifecycle Hooks interface opened');
    this.router.navigate(['/lifecycle-hooks']);
  }
}

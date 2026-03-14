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
}

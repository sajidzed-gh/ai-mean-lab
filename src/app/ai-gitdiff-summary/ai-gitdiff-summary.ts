import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-gitdiff-summary',
  imports: [FormsModule],
  templateUrl: './ai-gitdiff-summary.html',
  styleUrl: './ai-gitdiff-summary.scss',
  standalone: true,
})
export class AiGitdiffSummary {
  diffText: string = 'some sample git diff blah blah';

  summary = signal<string>('');

  constructor(private http: HttpClient) {}

  summarizeDiff() {
    this.summary.set('');
    this.http
      .post<{
        summary: string;
      }>('http://localhost:3000/api/summarize', JSON.stringify({ diff: this.diffText }), {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe(
        (response) => {
          this.summary.set(response.summary);
        },
        (error) => {
          console.error('Error fetching summary:', error);
          this.summary.set('Error fetching summary');
        },
      );
  }
}

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
  streamNumbers = signal<number[]>([]);
  isLoading = signal<boolean>(false);

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

  async numbersStream() {
    let currentState = 1;
    const limit = 100;
    const total = 1000;
    this.isLoading.set(true);
    while (currentState < total) {
      const response: any = await this.http
        .get(`http://localhost:3000/api/numbers-stream?current=${currentState}&limit=${limit}`)
        .toPromise();
      this.streamNumbers.update((prev) => [...prev, ...response.data]);
      currentState = response.nextStart;
    }
    this.isLoading.set(false);
  }
}

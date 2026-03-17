import { CurrencyPipe } from '@angular/common';
import { signal, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiGitdiffStreamService {
  responseText = signal<string>('');
  isStreaming = signal<boolean>(false);

  async streamDiff(diff: string) {
    this.responseText.set('');
    this.isStreaming.set(true);

    const response = await fetch(
      `http://localhost:3000/api/summarize-stream?diff=${encodeURIComponent(diff)}`,
    );
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      console.error('No reader available for the response body');
      return;
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      // Clean SSE formatting: "data: {"text": "..."}"
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = JSON.parse(line.replace('data: ', '').trim());
          this.responseText.update((current) => current + jsonStr.text);
        }
      }
    }
    this.isStreaming.set(false);
  }
}

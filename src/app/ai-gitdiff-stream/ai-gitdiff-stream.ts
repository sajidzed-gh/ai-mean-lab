import { Component, inject } from '@angular/core';
import { AiGitdiffStreamService } from './ai-gitdiff-stream-service';

@Component({
  selector: 'app-ai-gitdiff-stream',
  imports: [],
  templateUrl: './ai-gitdiff-stream.html',
  styleUrl: './ai-gitdiff-stream.scss',
  standalone: true,
})
export class AiGitdiffStream {
  streamService = inject(AiGitdiffStreamService);
}

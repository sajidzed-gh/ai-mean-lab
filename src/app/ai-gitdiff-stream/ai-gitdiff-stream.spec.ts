import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiGitdiffStream } from './ai-gitdiff-stream';

describe('AiGitdiffStream', () => {
  let component: AiGitdiffStream;
  let fixture: ComponentFixture<AiGitdiffStream>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiGitdiffStream],
    }).compileComponents();

    fixture = TestBed.createComponent(AiGitdiffStream);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

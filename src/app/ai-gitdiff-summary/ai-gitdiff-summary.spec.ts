import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiGitdiffSummary } from './ai-gitdiff-summary';

describe('AiGitdiffSummary', () => {
  let component: AiGitdiffSummary;
  let fixture: ComponentFixture<AiGitdiffSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiGitdiffSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(AiGitdiffSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

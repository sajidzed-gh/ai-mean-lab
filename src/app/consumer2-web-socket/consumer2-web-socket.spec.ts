import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consumer2WebSocket } from './consumer2-web-socket';

describe('Consumer2WebSocket', () => {
  let component: Consumer2WebSocket;
  let fixture: ComponentFixture<Consumer2WebSocket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consumer2WebSocket],
    }).compileComponents();

    fixture = TestBed.createComponent(Consumer2WebSocket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

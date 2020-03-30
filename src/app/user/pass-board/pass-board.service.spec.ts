import { TestBed } from '@angular/core/testing';

import { PassBoardService } from './pass-board.service';

describe('PassBoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassBoardService = TestBed.get(PassBoardService);
    expect(service).toBeTruthy();
  });
});

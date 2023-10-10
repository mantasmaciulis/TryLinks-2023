import { TestBed } from '@angular/core/testing';

import { TrylinksService } from './trylinks.service';

describe('TrylinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrylinksService = TestBed.get(TrylinksService);
    expect(service).toBeTruthy();
  });
});

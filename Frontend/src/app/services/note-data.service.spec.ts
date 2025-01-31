import { TestBed } from '@angular/core/testing';

import { NoteDataService } from './note-data.service';

describe('NoteDataService', () => {
  let service: NoteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

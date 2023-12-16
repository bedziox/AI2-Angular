import { TestBed } from '@angular/core/testing';

import { PersonLsService } from './person-ls.service';

describe('PersonLsService', () => {
  let service: PersonLsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonLsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

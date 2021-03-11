import { TestBed } from '@angular/core/testing';

import { EncrptionService } from './encrption.service';

describe('EncrptionService', () => {
  let service: EncrptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

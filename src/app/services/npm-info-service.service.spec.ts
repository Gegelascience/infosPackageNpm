import { TestBed } from '@angular/core/testing';

import { NpmInfoServiceService } from './npm-info-service.service';

describe('NpmInfoServiceService', () => {
  let service: NpmInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpmInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InvestigacionService } from './investigacion.service';

describe('InvestigacionService', () => {
  let service: InvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

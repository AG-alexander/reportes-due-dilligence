import { TestBed } from '@angular/core/testing';

import { DataStorageService } from './data-store.service';

describe('DataStoreService', () => {
  let service: DataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

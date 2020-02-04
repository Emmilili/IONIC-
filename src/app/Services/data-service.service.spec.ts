import { TestBed } from '@angular/core/testing';

import { DbdatServiceService } from './dbdat-service.service';

describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbdatserviceeService = TestBed.get(DbdatServiceService);
    expect(service).toBeTruthy();
  });
});

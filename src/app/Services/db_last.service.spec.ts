import { TestBed } from '@angular/core/testing';

import { MydbserviceService } from './mydbservice.service';

describe('MydbserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MydbserviceService = TestBed.get(MydbserviceService);
    expect(service).toBeTruthy();
  });
});

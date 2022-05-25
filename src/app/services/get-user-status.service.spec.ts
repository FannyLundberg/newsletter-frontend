import { TestBed } from '@angular/core/testing';

import { GetUserStatusService } from './get-user-status.service';

describe('GetUserStatusService', () => {
  let service: GetUserStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

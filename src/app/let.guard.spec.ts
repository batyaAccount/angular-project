import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { letGuard } from './let.guard';

describe('letGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => letGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

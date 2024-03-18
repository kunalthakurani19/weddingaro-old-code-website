import { TestBed } from '@angular/core/testing';

import { VendorauthguardService } from './vendorauthguard.service';

describe('VendorauthguardService', () => {
  let service: VendorauthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorauthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

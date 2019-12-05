import { TestBed } from '@angular/core/testing';

import { BaseHttpClientService } from './base-http-client.service';

describe('BaseHttpClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseHttpClientService = TestBed.get(BaseHttpClientService);
    expect(service).toBeTruthy();
  });
});

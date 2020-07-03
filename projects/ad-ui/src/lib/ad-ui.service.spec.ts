import { TestBed } from '@angular/core/testing';

import { AdUiService } from './ad-ui.service';

describe('AdUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdUiService = TestBed.get(AdUiService);
    expect(service).toBeTruthy();
  });
});

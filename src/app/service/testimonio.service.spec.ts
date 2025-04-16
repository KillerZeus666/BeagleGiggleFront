import { TestBed } from '@angular/core/testing';

import { TestimonioService } from './testimonio.service';

describe('TestimonioService', () => {
  let service: TestimonioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimonioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

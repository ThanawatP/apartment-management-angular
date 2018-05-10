import { TestBed, inject } from '@angular/core/testing';

import { RentalService } from './rental.service';

describe('RentalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentalService]
    });
  });

  it('should be created', inject([RentalService], (service: RentalService) => {
    expect(service).toBeTruthy();
  }));
});

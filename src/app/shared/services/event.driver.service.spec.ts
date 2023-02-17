/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Event.driverService } from './event.driver.service';

describe('Service: Event.driver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Event.driverService]
    });
  });

  it('should ...', inject([Event.driverService], (service: Event.driverService) => {
    expect(service).toBeTruthy();
  }));
});

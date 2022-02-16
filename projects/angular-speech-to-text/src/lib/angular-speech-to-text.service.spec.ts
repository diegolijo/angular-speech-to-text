import { TestBed } from '@angular/core/testing';

import { AngularSpeechToTextService } from './angular-speech-to-text.service';

describe('AngularSpeechToTextService', () => {
  let service: AngularSpeechToTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSpeechToTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

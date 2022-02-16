import { TestBed } from '@angular/core/testing';

import { SpeechToText } from './angular-speech-to-text.service';

describe('SpeechToText', () => {
  let service: SpeechToText;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechToText);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

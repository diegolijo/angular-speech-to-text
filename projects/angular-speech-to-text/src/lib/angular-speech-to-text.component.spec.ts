import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSpeechToTextComponent } from './angular-speech-to-text.component';

describe('AngularSpeechToTextComponent', () => {
  let component: AngularSpeechToTextComponent;
  let fixture: ComponentFixture<AngularSpeechToTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularSpeechToTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSpeechToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { rejects } from 'assert';
import { Subject } from 'rxjs';

declare const cordova: any;
export interface IResultEvent {
  result: any;
}

export interface ISubscriber {
  id: string;
  subscriber: any;
}

@Injectable()
export class SpeechToText {

  private recognizerSubject = new Subject<IResultEvent>();
  private recognizerSubscribes: any = {};

  private downloadSubscriber: any = {};
  private downloadSubject = new Subject<any>();

  private syntSubscribes: any = {};
  private synthSubject = new Subject<any>();

  constructor(
    private platform: Platform,
    private ngZone: NgZone
  ) { }

  public download(locale: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.download((value: any) => {
          this.downloadSubject.next(value);
          resolve(value);
        }, (err: any) => {
          reject(err);
        }, locale);
      }
    });
  }

  public getDownloadedLanguages(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.getDownloadedLanguages((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
      }
    });
  }

  public getAvailableLanguages(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.getAvailableLanguages((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
      }
    });
  }

  public enableRecognizer(locale?: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.enable((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        },
          locale);
      }
    });
  }

  public startRecognizer(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      cordova.plugins.SpeechToText.start((value: any) => {
        this.recognizerSubject.next(value);
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public stopRecognizer(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.stop((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
      }
    });
  }

  public isPlaying(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.isPlaying((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
      }
    });
  }

  public isEnable(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.isEnable((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
      }
    });
  }

  public synthText(text: string, flush?: boolean): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.speechText((value: any) => {
          this.synthSubject.next(value);
          resolve(value);
        }, (err: any) => {
          reject(err);
        },
          text, flush);
      }
    });
  }

  public getSynthVoices(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.getSpeechVoices((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
      }
    });
  }

  public setSynthVolume(vol: number): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.setSpeechVolume((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        },
          vol);
      }
    });
  }

  public setSynthVoice(name: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.setSpeechVoice((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        },
          name);
      }
    });
  }

  public playSound(path: string, volume: number): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.playSound((value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        },
        path, volume);
      }
    });
  }

  //****************************** EVENTS *****************************/
  public subscrbeToRecognizer(id: string, callbackFunction: any, errorFunction: any): void {
    try {
      const element = this.recognizerSubscribes[id];
      if (!element || (element.subscriber && element.subscriber.closed)) {
        const subscriber = this.recognizerSubject.asObservable().subscribe((value) => {
          this.ngZone.run(() => {
            callbackFunction(value);
          });
        });
        this.recognizerSubscribes[id] = {
          key: id,
          subscriber: subscriber
        };
      }
    } catch (err) {
      errorFunction(err);
    }
  }

  public unsubscribeToRecognizer(id: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      try {
        const element = this.recognizerSubscribes[id];
        if (element && element.subscriber && !element.subscriber.closed) {
          element.subscriber.unsubscribe();
        };
        if (element) {
          delete this.recognizerSubscribes[id];
          resolve('subscribe ok');
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  public subscrbeToSyntesizer(id: string, callbackFunction: any, errorFunction: any): void {
    try {
      const element = this.syntSubscribes[id];
      if (!element || (element.subscriber && element.subscriber.closed)) {
        const subscriber = this.synthSubject.asObservable().subscribe((value) => {
          this.ngZone.run(() => {
            callbackFunction(value);
          });
        });
        this.syntSubscribes[id] = {
          key: id,
          subscriber: subscriber
        };
      }
    } catch (err) {
      errorFunction(err);
    }
  }

  public unsubscribeToSyntesizer(id: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      try {
        const element = this.syntSubscribes[id];
        if (element && element.subscriber && !element.subscriber.closed) {
          this.syntSubscribes[id].subscriber.unsubscribe();
        };
        if (this.syntSubscribes[id]) {
          delete this.syntSubscribes[id];
        }
        resolve('subscribe ok');
      } catch (err) {
        reject(err);
      }
    });
  }

  public subscrbeToDownload(id: string, callbackFunction: any, errorFunction: any): Promise<any> {
    return new Promise((resolve) => {
      try {
        if (!this.downloadSubscriber[id]) {
          this.downloadSubscriber[id] = this.downloadSubject.asObservable().subscribe((value) => {
            this.ngZone.run(() => {
              callbackFunction(value);
            });
          });
          resolve('subscribe ok');
        } else {
          resolve('parameter id already in use');
        }
      } catch (err) {
        errorFunction(err);
      }
    });
  }

  public unsubscribeToDownload(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this.downloadSubscriber[id]) {
          !this.downloadSubscriber[id] || this.downloadSubscriber[id].unsubscribe();
          delete this.downloadSubscriber[id];
        };
        resolve('subscribe ok');
      } catch (err) {
        reject(err);
      }
    });
  }

}

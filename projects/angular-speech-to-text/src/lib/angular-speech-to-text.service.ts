/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
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

  private resultSubject = new Subject<IResultEvent>();
  private subscribes: any = {};

  private downloadSubject = new Subject<any>();
  private downloadSubscriber: any = {};
  private speechSubject = new Subject<any>();

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

  public enableSpeech(locale?: string): Promise<any> {
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

  public startSpeech(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      cordova.plugins.SpeechToText.start((value: any) => {
        this.resultSubject.next(value);
        resolve(value);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  public stopSpeech(): Promise<any> {
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

  public speechText(text: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.speechText((value: any) => {
          this.speechSubject.next(value);
          resolve(value);
        }, (err: any) => {
          reject(err);
        },
          text);
      }
    });
  }


  public getSpeechVoices(): Promise<any> {
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

  public setSpeechVolume(vol: number): Promise<any> {
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

  public setSpeechVoice(name: string): Promise<any> {
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

  //****************************** EVENTS *****************************/
  public subscrbeToSpeech(id: string, callbackFunction: any, errorFunction: any, callbackSpeech: any): void {
    try {
      const element = this.subscribes[id];
      let subscriber: any;
      let subscriberSp: any;
      if (!element || (element.key === id && element.subscriber.closed)) {
        subscriber = this.resultSubject.asObservable().subscribe((value) => {
          this.ngZone.run(() => {
            callbackFunction(value);
          });
        });
        subscriberSp = this.speechSubject.asObservable().subscribe((value) => {
          this.ngZone.run(() => {
            callbackSpeech(value);
          });
        });
        this.subscribes[id] = {
          subscriber: subscriber,
          key: id,
          subscriberSp: subscriberSp
        };
      }
    } catch (err) {
      errorFunction(err);
    }
  }

  public unsubscribeToSpeech(id: string): void {
    if (this.subscribes[id] && !this.subscribes[id].subscriber.closed) {
      this.subscribes[id].subscriber.unsubscribe();
    };
    if (this.subscribes[id] && !this.subscribes[id].subscriberSP.closed) {
      this.subscribes[id].subscriberSp.unsubscribe();
      delete this.subscribes[id];
    };
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
          resolve('ya existe la funcion callback');
        }
      } catch (err) {
        errorFunction(err);
      }
    });
  }

  public unsubscribeToDownload(id: string, callbackFunction: any): Promise<any> {
    return new Promise((resolve) => {
      try {
        if (this.downloadSubscriber[id]) {
          this.downloadSubscriber[id].unsubscribe();
          delete this.downloadSubscriber[id];
        };
        resolve('unsubscribe ok');
      } catch (err) {
        resolve('no existe  la funcion callback');
      }
    });
  }

}

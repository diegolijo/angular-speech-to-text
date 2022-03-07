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
          resolve(value);
        }, (err: any) => {
          reject(err);
        },
          locale);
      }
    });
  }

  // TODO implementar otros idiomas
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

  public subscrbeToSpeech(id: string, callbackFunction: any, errorFunction: any): void {
    try {
      const element = this.subscribes[id];
      let subscriber: any;
      if (!element || (element.key === id && element.subscriber.closed)) {
        subscriber = this.resultSubject.asObservable().subscribe((value) => {
          this.ngZone.run(() => {
            callbackFunction(value);
          });
        });
        this.subscribes[id] = {
          subscriber: subscriber,
          key: id
        };
      }
    } catch (err) {
      errorFunction(err);
    }
  }

  public unsubscribeToSpeech(id: string): void {
    if (this.subscribes[id] && !this.subscribes[id].subscriber.closed) {
      this.subscribes[id].subscriber.unsubscribe();
      delete this.subscribes[id];
    };
  }


}

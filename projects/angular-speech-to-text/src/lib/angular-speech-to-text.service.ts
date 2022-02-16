/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';

declare const cordova: any;
export interface IResultEvent {
  flag: string;
  result: any;
}

export interface ISubscriber {
  id: string;
  subscriber: any;
}

@Injectable()
export class SpeechToText {
  /**
   * flags de los eventos
   */

  public static readonly EVENT_RESULT: string = 'speech-result';
  public static readonly EVENT_FINAL: string = 'speech-partial-result';

  private resultSubject = new Subject<IResultEvent>();
  private subscribes: any = {};

  constructor(
    private platform: Platform,
    private ngZone: NgZone
  ) { }

  public enableSpeech(idioma: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      if (this.platform.is('cordova')) {
        cordova.plugins.SpeechToText.enable(idioma, (value: any) => {
          resolve(value);
        }, (err: any) => {
          reject(err);
        });
      }
    });
  }

  public startSpeech(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      if (!this.platform.is('cordova')) {
        const msg = 'Speech-to-text plugin not available';
        reject(msg);
      }
      cordova.plugins.SpeechToText.start((res: any) => {
        //TODO filtrar respuesta partial/result
        console.log('%c resultSpeech: ' + JSON.stringify(res), 'color:green');
        this.resultSubject.next({ flag: SpeechToText.EVENT_RESULT, result: res });
        resolve(true);
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
          console.log('%c stopSpeech: ' + JSON.stringify(value), 'color:green');
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

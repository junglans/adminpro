import { Injectable, Inject } from '@angular/core';
import { TOPICS, TOPICS_LIST } from './topics';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class NotifierService {

  private subjects: any = {};

  constructor(@Inject(TOPICS_LIST) private _topicsList: any, @Inject(TOPICS) private _topics: any) {
    this._topicsList.forEach(element => {
      this.subjects[element] = {
         objectClass: _topics[element].objectClass,
         subject: new Subject<any>()
      };
    });
  }

  public subscribeOn(topic: string): Observable<any> {

      const subject: Subject<any> = this.subjects[topic].subject;
      if (subject) {
        return subject.asObservable();
      } else {
        return null;
      }
  }

  public publishOn(topic: string, message: any): Promise<boolean> {

     return new Promise<any>(
      (resolve, reject) => {
          const subject: Subject<any> = this.subjects[topic].subject;
          if (subject) {
              if (message instanceof this.subjects[topic].objectClass) {
                subject.next(message);
                resolve(true);
              } else {
                reject({error: `Invalid class for topic: ${topic}`});
              }
          } else {
            reject({error: `Topic not found: ${topic}`});
          }
         }
      );

  }
}



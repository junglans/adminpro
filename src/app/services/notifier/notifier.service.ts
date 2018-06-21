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

  public subscribeOn(topic: string): Observable<Observable<any>> {

    return new Observable<any>(
      (observer) => {
         const subject: Subject<any> = this.subjects[topic].subject;
         if (subject) {
            observer.next(subject.asObservable());
         } else {
            observer.error({error: `Topic not found: ${topic}`});
         }
         observer.complete();
      }
    );
  }

  public publishOn(topic: string, message: any): Observable<boolean> {

     return new Observable<any>(
      (observer) => {
          const subject: Subject<any> = this.subjects[topic].subject;
          if (subject) {
              if (message instanceof this.subjects[topic].objectClass) {
                // Publicando en el tópico.
                subject.next(message);
                observer.next(true);
              } else {
                observer.error({error: `Invalid class for topic: ${topic}`});
              }
          } else {
            observer.error({error: `Topic not found: ${topic}`});
          }
          observer.complete();
         }
      );

  }
}



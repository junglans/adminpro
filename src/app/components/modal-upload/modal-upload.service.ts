import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ModalUploadService {

  private subject: Subject<any> = new Subject<any>();
  type: string;
  id: string;
  img: string;

  constructor() {}

  public getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  public publish(value: any) {
    this.subject.next(value);
  }
}

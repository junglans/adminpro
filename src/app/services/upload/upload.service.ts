import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UploadService {

  constructor() { }

  public upload(file: File, type: string, id: string): Observable<any> {

    return Observable.create(
        observer => {
            const formData: FormData = new FormData();
            const xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('img', file, file.name);

            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  observer.next(JSON.parse(xhr.response));
                  observer.complete();
                } else {
                  observer.error(xhr.response);
                }
              }
            };
        }

    );

  }
}

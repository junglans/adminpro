import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SERVICE_URL } from '../../config/config';

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

            xhr.upload.onprogress = (event) => {
              console.log('Progreso ', Math.round(event.loaded / event.total * 100)) ;
            };
            const url = SERVICE_URL + `/upload/${type}/${id}`;

            xhr.open('PUT', url, true);
            xhr.send(formData);
        }

    );

  }
}

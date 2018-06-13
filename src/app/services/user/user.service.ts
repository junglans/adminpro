import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

import { SERVICE_URL } from '../../config/config';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map } from 'rxjs/operators';
import { Login } from '../../models/login.model';
import { Subject } from 'rxjs/internal/Subject';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class UserService {

  // Por medio de este observable se notifica que el usuario se ha modificado.
  private subject = new Subject<any>();
  constructor(private http: HttpClient, private _uploadService: UploadService) { }

  public getSubject(): Observable<any> {
      return this.subject.asObservable();
  }

  public crearUser(user: User): Observable<any> {

      const url = SERVICE_URL + '/user';
      return this.http.request(new HttpRequest('POST', url, user))
      .pipe(
          filter( (response: any) => response instanceof HttpResponse ),
          map((response: any) => {
              return response.body;
          })
      );
  }


  public updateUser(user: User): Observable<any> {

    const token = localStorage.getItem('token');
    const url = SERVICE_URL + `/user/${user._id}?token=${token}`;

    return this.http.request(new HttpRequest('PUT', url, user)).pipe(
        filter( (response: any) => response instanceof HttpResponse ),
        map((response: any) => {
            this.subject.next(response.body.user);
            return response.body;
        })
    );
  }

  public changeImage(image: File, id: string): Observable<any> {
        const observable: Observable<any> = this._uploadService.upload(image, 'users', id);
        observable.subscribe(
            (response) => {
                this.subject.next(response.user);
            }
        );
        return observable;
  }


  public login(login: Login): Observable<any> {
    const url = SERVICE_URL + '/login';
    return this.http.request(new HttpRequest('POST', url, login)).pipe(
        filter( (response: any) => response instanceof HttpResponse ),
        map((response: any) => {
            return response.body;
        })
    );
  }

  public loginGoogle(token: string): Observable<any> {
    const url = SERVICE_URL + '/login/google';
    return this.http.request(new HttpRequest('POST', url , { token })).pipe(
        filter( (response: any) => response instanceof HttpResponse ),
        map((response: any) => {
            return response.body;
        })
    );
  }


  public logout(): Observable<boolean> {

    localStorage.removeItem('id');
    localStorage.removeItem('token');

    const remember:boolean = JSON.parse(localStorage.getItem('remember')) || false;
    if (!remember) {
         localStorage.removeItem('user');
    }

    // suponemos que el logout puede ser más costoso, por ejemplo acceder a la BD.
    // Implementamos el método para devolver un Observable.
    return new Observable<boolean>(
        (observer) => {
            observer.next(true);
        }
    );
  }
}

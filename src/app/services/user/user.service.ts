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
      return this.executeRequest('POST', url, user);
  }


  public updateUser(user: User): Observable<any> {
    const token = localStorage.getItem('token');
    const url = SERVICE_URL + `/user/${user._id}?token=${token}`;
    return this.executeRequest('PUT', url, user);
  }

  public changeUser(user: User) {
    if (user) {
       this.subject.next(user);
    }
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

  public loadUsers(from: number = 0): Observable<any> {
    const url = SERVICE_URL + `/user?from=${from}`;
    return this.executeRequest('GET', url);
  }


  public searchUsers(term: string, from: number = 0): Observable<any> {
    const url = SERVICE_URL + `/search/entity/users/${term}?from=${from}`;
    return this.executeRequest('GET', url);
  }

  public deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const url = SERVICE_URL + `/user/${userId}?token=${token}`;
    return this.executeRequest('DELETE', url);
  }

  public login(login: Login): Observable<any> {
    const url = SERVICE_URL + '/login';
    return this.executeRequest('POST', url, login);
  }

  public loginGoogle(token: string): Observable<any> {
    const url = SERVICE_URL + '/login/google';
    return this.executeRequest('POST', url, { token });
  }


  public logout(): Observable<boolean> {

    localStorage.removeItem('id');
    localStorage.removeItem('token');

    const remember: boolean = JSON.parse(localStorage.getItem('remember')) || false;
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

  private executeRequest(method: string, url: string, body?: any):  Observable<any> {
    return this.http.request(new HttpRequest(method, url, body)).pipe(
        filter( (response: any) => response instanceof HttpResponse ),
        map((response: any) => {
            return response.body;
        })
    );
  }
}

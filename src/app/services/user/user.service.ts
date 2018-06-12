import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

import { SERVICE_URL } from '../../config/config';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map } from 'rxjs/operators';
import { Login } from '../../models/login.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

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
            console.log('Response', response);
            return response.body;
        })
    );
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

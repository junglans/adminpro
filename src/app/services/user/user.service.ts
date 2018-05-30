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

  public login(login: Login): Observable<any> {
    const url = SERVICE_URL + '/login';
    return this.http.request(new HttpRequest('POST', url, login)).pipe(
        filter( (response: any) => response instanceof HttpResponse ),
        map((response: any) => {
            return response.body;
        })
    );
  }
}

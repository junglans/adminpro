import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

import { SERVICE_URL } from '../../config/config';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public crearUsuario(user: User): Observable<any> {

      const url = SERVICE_URL + '/user';
      return this.http.request(new HttpRequest('POST', url, user))
      .pipe(
          map((response: any) => {
            return response.user;
          })
      );

  }
}

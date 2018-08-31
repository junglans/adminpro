import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { catchError  } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';


export class BaseService {

  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public executeRequest(method: string, url: string, body?: any):  Observable<any> {
    return this.http.request(new HttpRequest(method, url, body)).pipe(
        filter( (response: any) => response instanceof HttpResponse ),
        map((response: any) => {
            return response.body;
        }),
        catchError(this.handleError)
    );
  }
  /**
   *
   * @param error En este método podemos controlar el error y realizar modificaciones
   * Por ejemplo podemos modificar el mensaje.
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // error.error.errors.message = 'Ups! Se ha producido un error';
    return throwError(error);
  }
}

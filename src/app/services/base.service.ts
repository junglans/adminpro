import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';

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
        })
    );
  }
}

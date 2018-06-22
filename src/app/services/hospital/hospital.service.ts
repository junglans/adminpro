import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SERVICE_URL } from '../../config/config';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { BaseService } from '../base.service';

@Injectable()
export class HospitalService extends BaseService {

  constructor(public http: HttpClient) {
      super(http);
  }

  public loadHospitals(from: number = 0): Observable<any> {
    const url = SERVICE_URL + `/hospital?from=${from}`;
    return this.executeRequest('GET', url);
  }

  public searchHospitals(term: string, from: number = 0): Observable<any> {
    const url = SERVICE_URL + `/search/entity/hospitals/${term}?from=${from}`;
    return this.executeRequest('GET', url);
  }
}

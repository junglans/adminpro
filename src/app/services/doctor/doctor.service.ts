import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SERVICE_URL } from '../../config/config';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseService {

  constructor(public http: HttpClient) {
    super(http);
  }

  public loadDoctors(from: number = 0): Observable<any> {
    const url = SERVICE_URL + `/doctor?from=${from}`;
    return this.executeRequest('GET', url);
  }

  public searchDoctors(term: string, from: number = 0): Observable<any> {
    const url = SERVICE_URL + `/search/entity/doctors/${term}?from=${from}`;
    return this.executeRequest('GET', url);
  }
}

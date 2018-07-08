import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SERVICE_URL } from '../../config/config';
import { BaseService } from '../base.service';
import { Hospital } from '../../models/hospital.model';

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

  public deleteHospital(hospital: Hospital): Observable<any> {
      const url = SERVICE_URL + `/hospital/${hospital._id}?token=${localStorage.getItem('token')}`;
      return this.executeRequest('DELETE', url);
  }
 
  public updateHospital(hospital: Hospital): Observable<any> {
    const url = SERVICE_URL + `/hospital/${hospital._id}?token=${localStorage.getItem('token')}`;
    return this.executeRequest('PUT', url, hospital);
  }

  public createHospital(hospital: Hospital): Observable<any> {
    const url = SERVICE_URL + `/hospital?token=${localStorage.getItem('token')}`;
    return this.executeRequest('POST', url, hospital);
  }

  public getHospital(id: string): Observable<any> {
    const url = SERVICE_URL + `/hospital/${id}`;
    return this.executeRequest('GET', url);
  }
}

import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs/internal/Observable';
import { SERVICE_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService extends BaseService {

  constructor(public http: HttpClient) {
    super(http);
  }

  public performSearch(term: string): Observable<any> {
      const url = SERVICE_URL + `/search/all/${term}`;
      return this.executeRequest('GET', url);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalSearchService } from '../../services/global-search/global-search.service';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styles: []
})
export class GlobalSearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private _globalSearchService: GlobalSearchService) {
    this.activatedRoute.params.subscribe((params) => {
         this.performSearch(params.term);
    });
  }

  ngOnInit() {
  }

  private performSearch(term: string) {
      this._globalSearchService.performSearch(term).subscribe(
        (response: any) => {
          this.users = response.users.records;
          this.hospitals = response.hospitals.records;
          this.doctors = response.doctors.records;
        }
      );
  }
}

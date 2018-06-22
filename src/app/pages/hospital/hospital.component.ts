import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { SERVICE_URL } from '../../config/config';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  from: number = 0;
  term: string = '';
  totalRecords: number = 0;
  hospitals: Hospital[] = [];
  loading: boolean = true;

  constructor(private _hospitalService: HospitalService) {}


  ngOnInit() {
    this.load();
  }

  public load() {

    this._hospitalService.loadHospitals(this.from).subscribe(
      (response) => {
        this.hospitals = response.hospitals;
        this.totalRecords = response.total;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        swal({title: 'Se ha producido un error.',
              text: error.error.errors.message,
              icon: 'error'});
            },
      () => {
        console.log('loadUsers: Fin observación');
      }
    );
  }

  public startSearch() {
      this.loading = true;
      this.from = 0;
      if (!this.term || this.term.length === 0) {
        this.load();
      } else {
        this.search();
      }
  }

  private search() {
    this._hospitalService.searchHospitals(this.term, this.from).subscribe(
      (response) => {
        this.hospitals = response.hospitals;
        this.totalRecords = response.total;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        swal({title: 'Se ha producido un error.',
              text: error.error.errors.message,
              icon: 'error'});
            },
      () => {
        console.log('loadUsers: Fin observación');
      });
  }

  public update(hospital: Hospital) {

  }
  public delete(hospital: Hospital) {

  }

  public page(from: number = 0) {

  }
}


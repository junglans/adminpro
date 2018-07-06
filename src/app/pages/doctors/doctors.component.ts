import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  constructor(private _doctorService: DoctorService) { }

  term: string = '';
  loading: boolean = false;
  totalRecords: number = 0;
  doctors = [];
  from: number = 0;
  ngOnInit() {
    this.page();
  }

  public page(val: number = 0) {
    this.loading = true;
    this.from += val;
    if (!this.term || this.term.length === 0) {
      this.load();
    } else {
      this.search();
    }
  }

  public update(doctor: Doctor) {
    
  }

  public delete(doctor: Doctor) {

  }

  public createDoctor() {
    
  }
  private load() {

    this._doctorService.loadDoctors(this.from).subscribe(
      (response) => {
        this.doctors = new Array(response.doctors.length);
        let ind = 0;
        response.doctors.forEach(element => {
          this.doctors[ind++] = element;
        });
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
        console.log('load: Fin observación');
      }
    );
  }

  private search() {
    this._doctorService.searchDoctors(this.term, this.from).subscribe(
      (response) => {
        this.doctors = new Array(response.hospitals.length);
        let ind = 0;
        response.hospitals.forEach(element => {
          this.doctors[ind++] = element;
        });
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
        console.log('search: Fin observación');
      });
  }
}

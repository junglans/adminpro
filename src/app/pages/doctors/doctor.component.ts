import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { DoctorService, HospitalService} from '../../services/service.index';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  doctor: Doctor;
  hospital: Hospital;
  hospitals: Hospital[] = [];

  paramId: string;
  constructor(private _doctorService: DoctorService,
              private _hospitalService: HospitalService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.doctor = new Doctor();
    this.doctor.user = JSON.parse(localStorage.getItem('user'))._id;
    this.doctor.hospital = '';
    this.hospital = new Hospital('');

    this.activatedRoute.params.subscribe(
      (params) => {
        this.paramId = params['id'];
        if (this.paramId !== 'new') {
            this.loadDoctor(this.paramId);
        }
      }
    );
  }

  ngOnInit() {
    this.loadHospitals();
  }

  public saveDoctor(form: NgForm)  {
    if (form.invalid) {
      return;
    }

    let observable: Observable<any>;
    if (this.paramId === 'new') {
      observable = this._doctorService.saveDoctor(this.doctor);
    } else {
      observable = this._doctorService.updateDoctor(this.doctor);
    }
    observable.subscribe(
      (response) => {
        swal({title: 'Actualización realizada.',
                  text: `Actualizado el médico ${this.doctor.name}.`,
                  icon: 'success'}).then(() => {
                    this.doctor._id = response.doctor._id;
                    this.router.navigate([`/doctor/${response.doctor._id}`]);
                  });
      },
      (error) => {
        swal({title: 'Se ha producido un error.',
        text: error.error.errors.message,
        icon: 'error'});
      },
      () => {
        console.log('saveDoctor: Fin observación');
      }
    );
  }

  public hospitalChanged(event: any) {
    const hospitalId = event.target.value;
    this.getHospital(hospitalId);
  }

  private loadHospitals() {
    this._hospitalService.loadHospitals().subscribe(
      (response) => {
         this.hospitals = response.hospitals;
      }
    );
  }

  private getHospital(hospitalId: string) {
    this._hospitalService.getHospital(hospitalId).subscribe(
      (response) => {
         this.hospital = response.hospital;
      },
      (error) => {
        swal({title: 'Se ha producido un error.',
        text: error.error.errors.message,
        icon: 'error'});
      },
      () => {
        console.log('getHospital: Fin observación');
      }
    );
  }
  private loadDoctor(id: string) {
    this._doctorService.getDoctor(id).subscribe(
      (response) => {
          this.doctor = response.doctor;
          this.doctor.hospital = response.doctor.hospital._id;
          this.getHospital(this.doctor.hospital);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../models/doctor.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  constructor(private _doctorService: DoctorService,
              private _modalUploadService: ModalUploadService) { 

      this.subscription = this._modalUploadService.getObservable().subscribe(
        () => {
          this.page();
        }
      );
  }

  term: string = '';
  loading: boolean = false;
  totalRecords: number = 0;
  doctors = [];
  from: number = 0;

  subscription: Subscription;

  ngOnInit() {
    this.page();
  }

  /**
   *  @param doctor Pasamos la información del doctor al popup.
   */
  public publishDoctor(doctor: Doctor) {
    this._modalUploadService.type = 'doctors';
    this._modalUploadService.id = doctor._id;
    this._modalUploadService.img = doctor.img;
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

  public delete(doctor: Doctor) {

    swal({title: 'Solicitud de confirmación.',
          text: `¿Desea borrar el médico ${doctor.name}.?` ,
          icon: 'info',
          buttons: {
            accept: {text: 'Aceptar', value: true},
            catch: {text: 'Cancelar', value: false}
          }}).then((value) => {
             if (value) {
               this._doctorService.deleteDoctor(doctor).subscribe(
                  (response) => {
                    this.page();
                    swal({title: 'Actualización realizada.',
                              text: `Borrado el médico ${doctor.name}.` ,
                              icon: 'success'});
                  },
                  (error) => {
                    swal({title: 'Se ha producido un error.',
                    text: error.error.errors.message,
                    icon: 'error'});
                  },
                  () => {
                    console.log('delete: Fin observación');
                  }
                );
             } else {
              swal({title: 'Operación cancelada.',
              icon: 'info'});
             }
        }
    );
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
        console.log('search: Fin observación');
      });
  }
}

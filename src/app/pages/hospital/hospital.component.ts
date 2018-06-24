import { Component, OnInit, Inject } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  from: number = 0;
  term: string = '';
  totalRecords: number = 0;
  hospitals = [];
  loading: boolean = true;
  edited: any ;
  memento: string;

  constructor(private _hospitalService: HospitalService) {}


  ngOnInit() {
    // Se pagina la primera página
    this.page();
  }

  private load() {

    this._hospitalService.loadHospitals(this.from).subscribe(
      (response) => {
        this.hospitals = new Array(response.hospitals.length);
        let ind = 0;
        response.hospitals.forEach(element => {
          this.hospitals[ind] = {hospital: null, edit: false};
          this.hospitals[ind++].hospital = element;
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
        console.log('loadUsers: Fin observación');
      }
    );
  }

  private search() {
    this._hospitalService.searchHospitals(this.term, this.from).subscribe(
      (response) => {
        this.hospitals = new Array(response.hospitals.length);
        let ind = 0;
        response.hospitals.forEach(element => {
          this.hospitals[ind] = {hospital: null, edit: false};
          this.hospitals[ind++].hospital = element;
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

  public update(hospital: Hospital) {

    this._hospitalService.updateHospital(hospital).subscribe(
              (response) => {
                swal({title: 'Actualización realizada.',
                icon: 'success'}).then(
                  (value) => {
                    this.page();
                  }
                );
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
  }
  public delete(hospital: Hospital) {
    if (this.edited) {
      this.edited.edit = false;
      this.edited.hospital.name = this.memento;
    }
    swal({title: 'Solicitud de confirmación.',
          text: `¿Desea borrar el hospital ${hospital.name}.?` ,
          icon: 'info',
          buttons: {
            accept: {text: 'Aceptar', value: true},
            catch: {text: 'Cancelar', value: false}
          }}).then((value) => {
         if (value) {
               this._hospitalService.deleteHospital(hospital).subscribe(
                  (response) => {
                    this.page();
                    swal({title: 'Actualización realizada.',
                              text: `Borrado el hospital ${hospital.name}.` ,
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

  public page(val: number = 0) {
      this.loading = true;
      this.edited = null;
      this.from += val;
      if (!this.term || this.term.length === 0) {
        this.load();
      } else {
        this.search();
      }
  }

  public edit(row: any, index: number) {
    if (this.edited) {
      this.edited.edit = false;
      this.edited.hospital.name = this.memento;
    }
    this.edited = row;
    this.memento = row.hospital.name;
    this.edited.edit = true;
    document.getElementById('name' + index).hidden = false;
    document.getElementById('name' + index).focus();
  }

  public keyUp(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      const value = event.srcElement['value'];
      if (value && value.length !== 0) {
        this.edited.edit = false;
        this.update(this.edited.hospital);
      }
    }
  }
}


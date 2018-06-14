import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { SERVICE_URL } from '../../config/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  userImage: File;
  tempImage: string;

  constructor( private _userService: UserService) { }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData(): void {
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  public saveData(value: any) {

    this.user.name = value.name;
    if (value.email) {
       this.user.email = value.email;
    }

    this._userService.updateUser(this.user).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        swal({
              title: 'Actualización realizada',
              text: this.user.name,
              icon: 'success'
            });
      },
      (error) => {
        swal({title: 'Se ha producido un error.',
              text: error.error.errors.message,
              icon: 'error'});
    },
      () => { console.log('Observation ended'); }

    );
  }

  public chooseImage(file: File) {
      this.userImage = null;
      if (file) {
        if (file.type.indexOf('image') < 0) {
          swal({
            title: 'Tipo de archivo erróneo',
            text: 'El archivo seleccionado no es una imagen',
            icon: 'error'
          });
          return;
        }

        // código nativo javascript
        const reader = new FileReader();
        const urlTempImage = reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.tempImage = reader.result;
        };
        this.userImage = file;
      }
  }

  public changeImage() {
      this._userService.changeImage(this.userImage, this.user._id).subscribe(
        (response) => {
            this.user.img = response.user.img;
            localStorage.setItem('user', JSON.stringify(response.user));
            swal({
              title: 'Imagen actualizada',
              text: this.user.name,
              icon: 'success'
            });
        },
        (error) => {
          swal({title: 'Se ha producido un error.',
          text: error.error.errors.message,
          icon: 'error'});
        },
        () => {
            console.log('changeImage: Fin de la observacion');
        }
    );
  }
}

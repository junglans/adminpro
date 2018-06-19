import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  userImage: File;
  tempImage: string;
  constructor(private _uploadService: UploadService,
              private _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  public uploadImage() {
      this._uploadService.upload(this.userImage, '', '')
      .subscribe();
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
}

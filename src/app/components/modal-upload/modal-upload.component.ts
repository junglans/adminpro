import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit, OnDestroy {

  @ViewChild('file') file;

  image: File;
  tempImage: string;



  constructor(public _uploadService: UploadService,
              public _modalUploadService: ModalUploadService) {

  }

  ngOnInit() {}

  ngOnDestroy() {}

  public uploadImage() {
      this._uploadService.upload(this.image, this._modalUploadService.type, this._modalUploadService.id)
      .subscribe(
        (response) => {
            this._modalUploadService.publish(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
           this.close();
        }
    );
  }
  public chooseImage(file: File) {
    this.image = null;
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
      this.image = file;
    }
  }

  public close() {
    this._modalUploadService.id = null;
    this._modalUploadService.img = null;
    this.image = null;
    this.tempImage = null;
    this.file.nativeElement.value = null;

  }
}

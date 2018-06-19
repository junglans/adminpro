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

  userImage: File;
  tempImage: string;



  constructor(private _uploadService: UploadService,
              private _modalUploadService: ModalUploadService) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public uploadImage() {
      this._uploadService.upload(this.userImage, this._modalUploadService.type, this._modalUploadService.id)
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

  public close() {
    this._modalUploadService.id = null;
    this._modalUploadService.img = null;
    this.userImage = null;
    this.tempImage = null;
    this.file.nativeElement.value = null;

  }
}

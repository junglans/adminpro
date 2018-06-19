import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadService, SettingsService, SharedService, SidebarService, UserService, LoginGuard } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [UploadService,
              SettingsService,
              SharedService,
              SidebarService,
              UserService,
              LoginGuard,
              ModalUploadService],
  declarations: []
})
export class ServiceModule { }

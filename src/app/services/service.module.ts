import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadService, SettingsService, SharedService,
         SidebarService, UserService, LoginGuard,
         NotifierService, HospitalService, DoctorService,
         GlobalSearchService} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { TOPICS_PROVIDER } from './notifier/topics';


@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [UploadService,
              SettingsService,
              SharedService,
              SidebarService,
              UserService,
              HospitalService,
              LoginGuard,
              ModalUploadService,
              NotifierService,
              DoctorService,
              GlobalSearchService,
              TOPICS_PROVIDER],
  declarations: []
})
export class ServiceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadService, SettingsService, SharedService, SidebarService, UserService, LoginGuard } from './service.index';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [UploadService,
              SettingsService,
              SharedService,
              SidebarService,
              UserService,
              LoginGuard],
  declarations: []
})
export class ServiceModule { }

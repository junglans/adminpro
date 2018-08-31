import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ],
    imports: [
        CommonModule, RouterModule, PipesModule
    ]
})

export class SharedModule {}

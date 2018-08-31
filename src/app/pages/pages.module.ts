import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

import { TranslateModule } from '../translate/translate.module';
import { IncrementerComponent } from '../components/incrementer/incrementer.component';
import { DonughtGraphComponent } from '../components/donughtgraph/donughtgraph.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CommonModule } from '@angular/common';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { GlobalSearchComponent } from './global-search/global-search.component';


@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementerComponent,
        DonughtGraphComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalComponent,
        DoctorsComponent,
        DoctorComponent,
        GlobalSearchComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        CommonModule, SharedModule, PAGES_ROUTES, TranslateModule,
        FormsModule, ChartsModule, PipesModule
    ]
})

export class PagesModule {}

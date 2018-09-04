import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { AdminGuard } from '../guards/admin.guard';
import { VerifyTokenGuard } from '../guards/verify-token.guard';

const pagesRoutes: Routes = [
            {path: 'profile', canActivate: [VerifyTokenGuard], component: ProfileComponent, data: {title: 'User Profile'}},
            {path: 'dashboard', canActivate: [VerifyTokenGuard], component: DashboardComponent, data: {title: 'Dashboard'}},
            {path: 'progress', canActivate: [VerifyTokenGuard], component: ProgressComponent,  data: {title: 'ProgressBars'}},
            {path: 'graficas1', canActivate: [VerifyTokenGuard], component: Graficas1Component,  data: {title: 'Gráficas'}},
            {path: 'account-settings', canActivate: [VerifyTokenGuard],
                    component: AccountSettingsComponent,  data: {title: 'Ajustes de Tema'}},
            {path: 'promises', canActivate: [VerifyTokenGuard], component: PromisesComponent,  data: {title: 'Promesas'}},
            {path: 'rxjs', canActivate: [VerifyTokenGuard], component: RxjsComponent,  data: {title: 'Rxjs'}},
            {path: 'search/:term', canActivate: [VerifyTokenGuard], component: GlobalSearchComponent, data: {title: 'Búsqueda Global'}},
            // Mantenimientos.
            {path: 'users', canActivate: [VerifyTokenGuard, AdminGuard], 
                component: UsersComponent, data: {title: 'Mantenimiento de Usuarios'}},
            {path: 'hospitals', canActivate: [VerifyTokenGuard, AdminGuard], component: HospitalComponent,
            data: {title: 'Mantenimiento de Hospitales'}},
            {path: 'doctors', canActivate: [VerifyTokenGuard, AdminGuard], component: DoctorsComponent,
            data: {title: 'Mantenimiento de Médicos'}},
            {path: 'doctor/:id', canActivate: [VerifyTokenGuard, AdminGuard], component: DoctorComponent, data: {title: 'Datos de Médico'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

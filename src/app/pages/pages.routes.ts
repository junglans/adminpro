import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalComponent } from './hospital/hospital.component';


const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            {path: 'profile', canActivate: [LoginGuard], component: ProfileComponent, data: {title: 'User Profile'}},
            {path: 'dashboard', canActivate: [LoginGuard], component: DashboardComponent, data: {title: 'Dashboard'}},
            {path: 'progress', canActivate: [LoginGuard], component: ProgressComponent,  data: {title: 'ProgressBars'}},
            {path: 'graficas1', canActivate: [LoginGuard], component: Graficas1Component,  data: {title: 'Gráficas'}},
            {path: 'account-settings', canActivate: [LoginGuard], component: AccountSettingsComponent,  data: {title: 'Ajustes de Tema'}},
            {path: 'promises', canActivate: [LoginGuard], component: PromisesComponent,  data: {title: 'Promesas'}},
            {path: 'rxjs', canActivate: [LoginGuard], component: RxjsComponent,  data: {title: 'Rxjs'}},
            // Mantenimientos.
            {path: 'users', canActivate: [LoginGuard], component: UsersComponent, data: {title: 'Mantenimiento de Usuarios'}},
            {path: 'hospitals', canActivate: [LoginGuard], component: HospitalComponent, data: {title: 'Mantenimiento de Hospitales'}},
            {path: '', canActivate: [LoginGuard], redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

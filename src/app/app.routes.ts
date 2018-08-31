import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    { /*
       * Esta es la configuración para el Lazy Load del módulo PagesModule
       * Es el atributo "loadChildren" el que hace que se cargue el módulo
       * PagesModule cuando se llama a una url del PagesModule.
       * No hay que olvidar borrar el PagesModule del app.module.ts
       * */
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true});

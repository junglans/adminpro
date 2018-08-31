import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { TranslateModule } from './translate/translate.module';
// Se usa FormsModule para template-driven forms y ReactiveFormsModule para formularios reactivos.
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Services
import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { GuardsModule } from './guards/guards.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ServiceModule,
    SharedModule,
    GuardsModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }

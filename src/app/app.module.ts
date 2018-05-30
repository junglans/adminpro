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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, APP_ROUTES, PagesModule, TranslateModule, FormsModule, ReactiveFormsModule,
     ChartsModule, ServiceModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }

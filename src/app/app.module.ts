import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { TranslatePipe } from './translate/translate.pipe';
import { TranslateService } from './translate/translate.service';
import { PagesModule } from './pages/pages.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule, APP_ROUTES, PagesModule
  ],
  providers: [TRANSLATION_PROVIDERS, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

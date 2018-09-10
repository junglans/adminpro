import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { appRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { TranslatePipe } from './translate/translate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { ImagePipe } from './pipes/image.pipe';
import { RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, LoginComponent, RegisterComponent, PagesComponent, ImagePipe,
        NopagefoundComponent, TranslatePipe, HeaderComponent, SidebarComponent, BreadcrumbsComponent, ModalUploadComponent
      ],
      imports: [FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([])],
      providers: [TranslateService, TRANSLATION_PROVIDERS]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('app');
  }));

  it ('Should have a router-outlet', () => {

    const debugElement = fixture.debugElement.query( By.directive(RouterOutlet));
    expect( debugElement).not.toBeNull();
  });
});

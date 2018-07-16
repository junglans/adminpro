import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslatePipe } from '../translate/translate.pipe';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import swal from 'sweetalert';
import { HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: Login = new Login('', '');
  public remember: boolean = false;


  public auth2: any;
  // Podemos acceder al formulario desde el componente.
  @ViewChild('loginForm') loginForm: NgForm;
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.readEMailFromLocalStorage();
  }

  private googleInit(): void {

      gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({
            client_id: '902587725582-626kl5dekrco24vctutk3j3qct8qsfst.apps.googleusercontent.com',
            cookipolicy: 'single_host_origin',
            scope: 'profile email'
        });

        this.attachSignin(document.getElementById('btnGoogle'));
      });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
     // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(token).subscribe(
          (response: HttpResponse<any>) => {
            this.setInfoToLocalStorage(response);
            window.location.href = '#/dashboard';
          },
          (error) => {
            swal({title: 'Login no válido',
                  text: error.error.errors.message,
                  icon: 'error'});
          },
          () => {console.log('Login Google: Observación terminada');}
        );
    });
  }

  public logIn(): void {
      this._userService.login(this.login).subscribe(
        (response: HttpResponse<any>) => {

          this.setInfoToLocalStorage(response);
          this._router.navigate(['/dashboard']);

        },
        (error) => {
            swal({title: 'Login no válido',
                  text: error.error.errors.message,
                  icon: 'error'});
        },
        () => { console.log('Login: Observación terminada'); }
      );

  }

  /*
   * Se recupera el email del local storage para autocompletar el formulario de login.
   */
  private readEMailFromLocalStorage(): void {
      this.remember = JSON.parse(localStorage.getItem('remember')) || null;
      const user: User = JSON.parse(localStorage.getItem('user')) || null;

      if (user && this.remember) {
        this.login.email = user.email;
      } else {
        this.login.email = '';
      }

  }


  private setInfoToLocalStorage(response: any): void {

        localStorage.setItem('id', response.user._id);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('remember', JSON.stringify(this.remember));
        localStorage.setItem('menu', JSON.stringify(response.menu));

  }
}

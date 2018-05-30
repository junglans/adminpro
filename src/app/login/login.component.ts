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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: Login = new Login('', '');
  public remember: boolean = false;
 
  // Podemos acceder al formulario desde el componente.
  @ViewChild('loginForm') loginForm: NgForm;
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    init_plugins();
    this.readEMailFronLocalStorage();
  }

  public logIn(): void {

      console.log('loginForm invalid? ', this.loginForm.invalid);
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
  private readEMailFronLocalStorage(): void {
      const user: User = JSON.parse(localStorage.getItem('user')) || null;
      if (user) {
        this.login.email = user.email;
      } else {
        this.login.email = '';
      }
  }


  private setInfoToLocalStorage(response: any): void {

        localStorage.setItem('id', response.user._id);
        localStorage.setItem('token', response.token);
        if (this.remember) {
           localStorage.setItem('user', JSON.stringify(response.user));
        } else {
           localStorage.removeItem('user');
        }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    init_plugins();

    this.formGroup = new FormGroup({

        name: new FormControl(null, [Validators.required, Validators.minLength(10)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(10)]),
        confirmPassword: new FormControl(null, Validators.required),
        acceptConditions: new FormControl(false),

    }, { validators: this.checkEqual('password', 'confirmPassword')});
  }

  public registerUser(): void {
     if (!this.formGroup.get('acceptConditions').value) {
          this.formGroup.get('acceptConditions').setErrors( { noAccepted: true});
          return;
     }

     const user: User = new User(
       this.formGroup.value.name,
       this.formGroup.value.email,
       this.formGroup.value.password
     );
     this._userService.crearUser(user).subscribe(
         (resp) => {
            if (resp) {
                swal({title: 'Usuario creado!!', text: resp.user.email, icon: 'success'})
                .then( () => this._router.navigate(['/login']));
            }
          },
         (error) => {
          swal({title: 'Error creando el usuario',
                text: error.error.errors.message,
                icon: 'error'});
          },
          () => {
            console.log('Termino la observación');
          }
      );
  }


  public checkEqual(field1: string, field2: string) {
    return ( group: FormGroup ) => {

      if (group.get(field1).value === null || group.get(field2).value === null ||
          group.get(field1).value === '' || group.get(field2).value === '') {
        return null;
      }
      if (group.get(field1).value === group.get(field2).value) {
        return null;
      }
      return {
        equals: true
      };
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  totalRecords: number = 0;
  loading: boolean = true;
  term: string = '';
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this._userService.loadUsers(this.from).subscribe(
      (response) => {
        this.totalRecords = response.total;
        this.users = response.users;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        swal({title: 'Se ha producido un error.',
              text: error.error.errors.message,
              icon: 'error'});
            },
      () => {
        console.log('loadUsers: Fin observación');
      });
  }

  public page(from: number, term: string) {
    const value = this.from + from;
    if (value >= this.totalRecords) {
        return;
    }
    if (value < 0) {
      return;
    }
    this.from = value;
    if (!term && term.length === 0) {
      this.loadUsers();
    } else {
      this.searchUsers(term);
    }
  }

  public startSearchUsers(term: string) {
    this.from = 0;
    this.term = term;
    if (!term && term.length === 0) {
      this.loadUsers();
    } else {
      this.searchUsers(term);
    }
  }

  public searchUsers(term: string) {
    this.loading = true;
    this._userService.searchUsers(term, this.from).subscribe(
      (response) => {
        this.totalRecords = response.total;
        this.users = response.users;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        swal({title: 'Se ha producido un error.',
              text: error.error.errors.message,
              icon: 'error'});
            },
      () => {
        console.log('loadUsers: Fin observación');
      });
  }

  public deleteUser(user: User) {
      if (user) {

          const sessionUser: User = JSON.parse(localStorage.getItem('user'));
          if (user._id === sessionUser._id) {
            swal({title: 'Se ha producido un error.',
              text: 'No se puede borrar el usuario que está en sesión.',
              icon: 'error'});
              return;
          }
          swal({title: 'Confirmación',
                text: `¿Esta seguro de que desea borrar el usuario : ${user.name}?`,
                icon: 'info',
                dangerMode: true,
                buttons: {
                  accept: {text: 'Aceptar', value: true},
                  catch: {text: 'Cancelar', value: false}
                }
            }).then( (accept) => {
               if (accept) {
                  this._userService.deleteUser(user._id).subscribe(
                     (response) => {
                      this.startSearchUsers(this.term);
                      swal({title: 'Operación realiza.',
                            text: 'Borrado realizado con éxito',
                            icon: 'info'});
                     },
                     (error) => {
                      swal({title: 'Se ha producido un error.',
                            text: error.error.errors.message,
                            icon: 'error'});
                     },
                     () => { console.log('deleteUser: Observación terminada.')}
                  );
               } else {
                  swal({title: 'Operación cancelada.',
                        text: 'Se ha cancelado la operación de borrado',
                        icon: 'info'});
               }
            });

      }
  }
}

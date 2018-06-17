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
}

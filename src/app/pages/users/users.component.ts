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
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this._userService.loadUsers(this.from).subscribe(
      (response) => {
        this.totalRecords = response.total;
        this.users = response.users;
        console.log(response.users);
      },
      (error) => {
        swal({title: 'Se ha producido un error.',
              text: error.error.errors.message,
              icon: 'error'});
            },
      () => {
        console.log('loadUsers: Fin observación');
      });
  }

  public page(from: number) {
    const value = this.from + from;
    if (value >= this.totalRecords) {
        return;
    }
    if (value < 0) {
      return;
    }
    this.from = value;
    console.log(this.from);
    this.loadUsers();
  }
}

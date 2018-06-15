import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: Array<User> = new Array<User>();
  constructor() { }

  ngOnInit() {
  }

  loadUsers() {
    
  }
}

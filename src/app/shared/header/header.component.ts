import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router, private _userService: UserService) { }

  user: User;

  ngOnInit() {
    this.loadUserInfo();
  }

  private loadUserInfo() {
    this.user =  JSON.parse(localStorage.getItem('user'));
  }

  public logout() {
    this._userService.logout().subscribe(
      (response: boolean) => {
        if (response) {
            this._router.navigate(['/login']);
        }
      }
    );
  }
}

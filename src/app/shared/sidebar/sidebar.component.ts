import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  private menu: any;
  constructor(private _router: Router, private _userService: UserService, private _sidebarService: SidebarService) { }

  user: User;

  ngOnInit() {
    this.menu = this._sidebarService.getMenu();
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

import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  private menu: any;
  constructor(private _router: Router, private _userService: UserService, private _sidebarService: SidebarService) { }

  ngOnInit() {
    this.menu = this._sidebarService.getMenu();
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

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
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

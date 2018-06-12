import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  private menu: any;
  user: User;

  constructor(private _router: Router, private _userService: UserService,
              private _sidebarService: SidebarService) { 
        this.subscription = this._userService.getSubject().subscribe(
                  (message => {
                     this.user = message;
                  })
        );
  }

  ngOnInit() {
    this.menu = this._sidebarService.getMenu();
    this.loadUserInfo();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

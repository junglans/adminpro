import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private _router: Router, private _userService: UserService) { 
    this.subscription = this._userService.getSubject().subscribe(
      (message => {
         this.user = message;
      })
    );
  }

  user: User;

  ngOnInit() {
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

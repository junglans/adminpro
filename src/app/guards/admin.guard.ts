import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private _userService: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const user: User = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'ADMIN_ROLE') {
         return true;
      } else {
         this._userService.logout().subscribe((result) => {
            this.router.navigate(['/login']);
            return false;
         });
      }
  }
}

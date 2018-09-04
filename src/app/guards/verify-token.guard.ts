import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {
  constructor(private _userService: UserService, private router: Router) { }
  canActivate(): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      // recuperamos el token antigu¡o
      const oldToken: string = localStorage.getItem('token');
      // del token sacamos la fecha de expiración. La función atob decodifica un string en Base64
      const payload = JSON.parse( atob( oldToken.split('.')[1] ) );

      if (this.expiredToken(payload.exp)) {

            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            reject(false);

      } else {
        // Si quedan menos de 4 horas para que expire en token se renueva.
          if (this.verifyRenew(payload.exp)) {
            this._userService.renewToken(oldToken).subscribe(
              (result: any) => {
                const newToken: string = result.token;
                localStorage.setItem('token', newToken);
                resolve(true);
              },
              (error) => {
                localStorage.removeItem('token');
                this.router.navigate(['/login']);
                resolve(false);
              }
          );
        } else {
          resolve(true);
        }
      }
    });
  }

  private verifyRenew(fechaExpiration): boolean {
      const fechaToken = new Date(fechaExpiration * 1000);
      const now = new Date();
      // 4 horas antes de expirar el token.
      fechaToken.setTime(fechaToken.getTime() + (4 * 60 * 60 * 1000));
      return fechaToken.getTime() >= now.getTime();
  }

  private expiredToken(fechaExpiration): boolean {
    const now = new Date().getTime() / 1000;
    return fechaExpiration < now;
  }
}

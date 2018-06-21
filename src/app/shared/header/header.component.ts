import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Subscription, Observable } from 'rxjs';
import { NotifierService } from '../../services/service.index';
import { USERS_TOPIC, HOSPITALS_TOPIC } from '../../services/notifier/topics';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  userSubscription: Subscription;
  constructor(private _router: Router,
              private _userService: UserService,
              private _notifierService: NotifierService) {
    this.subscription = this._userService.getSubject().subscribe(
      (message => {
         this.user = message;
      })
    );

    this.userSubscription = this._notifierService.subscribeOn(USERS_TOPIC).subscribe(
      (observable) => {
        console.log('SUBCRICION CORRECTA :', observable);
        observable.subscribe(
          (response) => {
            console.log('Recibido evento de :' + USERS_TOPIC, response);
          }
        );
      },
      (error) => {
        console.log('ERROR DE SUBCRICION :', error);
      },
      () => {
        console.log('subcribe : Observación terminada.');
      }
    );
  }

  user: User;

  ngOnInit() {
    this.loadUserInfo();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  private loadUserInfo() {
    this.user =  JSON.parse(localStorage.getItem('user'));
  }

  public logout() {
    this._userService.logout().subscribe(
      (response: boolean) => {
        if (response) {
            this._router.navigate(['/login']);
            this._notifierService.publishOn(USERS_TOPIC, new User('Juan', 'jfjimenezp', '')).subscribe(
              (resp) => {
                console.log('PUBLICACION CORRECTA :', resp);
              },
              (error) => {
                console.log('ERROR DE PUBLICACION :', error);
              },
              () => {
                console.log('publishOn :Observación terminada.');
              }
            );
        }
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  constructor( private _userService: UserService) { }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData(): void {
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  public saveData(value: any) {

    this.user.name = value.name;
    if (value.email) {
       this.user.email = value.email;
    }

    this._userService.updateUser(this.user).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        swal({
              title: 'Actualización realizada',
              text: '',
              icon: 'success'
            });
      },
      (error) => {
        swal({title: 'Se ha producido un error.',
              text: error.error.errors.message,
              icon: 'error'});
    },
      () => { console.log('Observation ended'); }

    );
  }
}

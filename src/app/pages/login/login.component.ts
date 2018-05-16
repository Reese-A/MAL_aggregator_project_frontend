import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData: Object = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService) {

  }

  submit(e) {
    e.preventDefault();
    console.log(e);
    this.loginService.loginUser(this.userData)
      .toPromise()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

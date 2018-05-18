import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData: Object = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router) {

  }

  submit(e) {
    e.preventDefault();
    console.log(e);
    this.loginService.loginUser(this.userData)
      .toPromise()
      .then((data) => {
        console.log(data);
        return this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

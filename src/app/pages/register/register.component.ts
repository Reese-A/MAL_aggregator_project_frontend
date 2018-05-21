import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData: Object = {
    username: '',
    password: '',
    email: '',
    confirm: '',
  };
  error: boolean;

  constructor(private registerService: RegisterService, private router: Router) {
    this.error = false;
  }

  submit(e) {
    e.preventDefault();
    console.log(e);
    this.registerService.submitUser(this.userData)
      .toPromise()
      .then((data) => {
        if (data['message'] === 'Passwords much match') {
          console.log(data);
          return this.error = true;
        }
        console.log(data);
        return this.router.navigateByUrl('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

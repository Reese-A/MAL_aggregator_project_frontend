import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData: Object = {
    username: '',
    password: '',
    email: '',
  };

  constructor(private registerService: RegisterService) {

  }

  submit(e) {
    e.preventDefault();
    console.log(e);
    this.registerService.submitUser(this.userData)
      .toPromise()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent {

  constructor(private logoutService: LogoutService, private router: Router) {

  }
  logout() {
    this.logoutService.logout()
    .toPromise()
    .then((data) => {
      console.log(data);
      return this.router.navigateByUrl('/login');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

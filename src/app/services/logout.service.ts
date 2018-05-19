import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private http: HttpClient) {

  }

  logout() {
    console.log('logging out');
    return this.http.get('/api/clients/logout'); // returns an observable
  }
}

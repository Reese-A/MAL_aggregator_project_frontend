import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {

  }

  loginUser(data) {
    console.log('submitting');
    return this.http.post('/api/clients/login', data); // returns an observable
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {

  }

  submitUser(data) {
    console.log('submitting');
    return this.http.post('/api/clients', data); // returns an observable
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  getData(user) {
    console.log(user);
    return this.http.get(`https://kuristina.herokuapp.com/anime/${user.name}.json`);
  }

  submitInquiry(data) {
    console.log('submitting');
    return this.http.post('http://somurl.com', data); // returns an observable
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  getData(username) {
    console.log('Searching');
    console.log(username);
    return this.http.get(`https://kuristina.herokuapp.com/anime/${username}.json`);
  }

}

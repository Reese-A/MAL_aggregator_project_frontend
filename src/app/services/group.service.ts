import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) { }

  getGroup() {
    return this.http.get('/api/groups');
  }

  getGroupData(username) {
    return this.http.get(`https://kuristina.herokuapp.com/anime/${username}.json`)
      .toPromise()
      .then((data) => {
        console.log('Get Group Data: ', data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToGroup(data) {
    return this.http.post('/api/groups', data);
  }

  removeUser(name) {
    console.log(name);
    return this.http.delete('/api/groups/' + name);
  }
}

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

  addToGroup(data) {
    return this.http.post('/api/groups', data);
  }
}

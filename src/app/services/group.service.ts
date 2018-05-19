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
      //   const usersData = [];
      //   usersData.push(data);
      //   const usersSeries = usersData.map(function (user) {
      //     return user['myanimelist']['anime'];
      //   });
      //   return usersSeries;
      })

      // .then((usersSeries) => {
      //   let userShows = [];
      //   const shows = {};
      //   for (let i = 0; i < usersSeries.length; i++) {
      //     for (let j = 0; j < usersSeries[i].length; j++) {
      //       userShows = Object.values(usersSeries[i][j]);
      //       if (shows.hasOwnProperty(userShows[1])) {
      //         shows[userShows[1]].totalScore += Number(userShows[13]);
      //         shows[userShows[1]].userCount++;
      //       } else {
      //         shows[userShows[1]] = {
      //           title: userShows[1],
      //           score: Number(userShows[13]),
      //           watched_episodes: userShows[10],
      //           image: userShows[8],
      //           totalScore: Number(userShows[13]),
      //           userCount: 1
      //         };
      //       }
      //       shows[userShows[1]].groupScore = Number(shows[userShows[1]].totalScore / shows[userShows[1]].userCount).toPrecision(3);
      //     }
      //   }
      //   console.log('Shows: ', shows);
      //   return shows;
      //   // const showsTitles = Object.keys(shows);
      //   // console.log('titles: ', showsTitles);
      // })
      .catch((err) => {
        console.log(err);
      });
  }

  addToGroup(data) {
    return this.http.post('/api/groups', data);
  }
}

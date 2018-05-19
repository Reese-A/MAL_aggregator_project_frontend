import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { SearchService } from '../../services/search.service';

@Component({
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent {
  userNames: any;
  usersSeries: any;
  groupShows: Object;
  showsTitles: Object[];

  constructor(private groupService: GroupService, private searchService: SearchService) {
    this.userNames = [];
    this.usersSeries = [];
    this.groupShows = {};
    this.showsTitles = [];

    this.groupService.getGroup()
      .toPromise()
      .then((data: Array<any>) => {
        this.userNames = data.map(function (user) {
          return user.name;
        });
        return this.userNames;
      })

      .then((names) => {
        const promises = [];
        names.forEach((username) => {
          promises.push(this.groupService.getGroupData(username));
          // this.searchService.getData(username)

          // .toPromise()
          // .then((data) => {
          //   this.usersData.push(data);
          //   this.usersSeries = this.usersData.map(function (user) {
          //       return user['myanimelist']['anime'];
          //     });
          //   })

          //   .then((data) => {
          //     let userShows = [];
          //     const shows = {};
          //     for (let i = 0; i < this.usersSeries.length; i++) {
          //       for (let j = 0; j < this.usersSeries[i].length; j++) {
          //         userShows = Object.values(this.usersSeries[i][j]);
          //         if (shows.hasOwnProperty(userShows[1])) {
          //           shows[userShows[1]].totalScore += Number(userShows[13]);
          //           shows[userShows[1]].userCount++;
          //         } else {
          //           shows[userShows[1]] = {
          //             title: userShows[1],
          //             score: Number(userShows[13]),
          //             watched_episodes: userShows[10],
          //             image: userShows[8],
          //             totalScore: Number(userShows[13]),
          //             userCount: 1
          //           };
          //         }
          //         shows[userShows[1]].groupScore = Number(shows[userShows[1]].totalScore / shows[userShows[1]].userCount).toPrecision(3);
          //       }
          //     }
          //     console.log('Shows: ', shows);
          //     this.showsTitles = Object.keys(shows);
          //     console.log('titles: ', this.showsTitles);
          //     return this.groupShows = shows;
          //   })

          //   .catch((err) => {
          //     console.log(err);
          // });
        });
        return promises;
      })
      .then((promises) => {
        return Promise.all(promises);
      })
      .then((data) => {
        console.log('DATA: ', data);
        return this.usersSeries = data.map(function (user) {
          return user['myanimelist']['anime'];
        });
      })

      .then((data) => {
        // console.log('HERE: ', data);
        let userShows = [];
        const shows = {};
        for (let i = 0; i < this.usersSeries.length; i++) {
          for (let j = 0; j < this.usersSeries[i].length; j++) {
            userShows = Object.values(this.usersSeries[i][j]);
            if (shows.hasOwnProperty(userShows[1])) {
              shows[userShows[1]].totalScore += Number(userShows[13]);
              shows[userShows[1]].userCount++;
            } else {
              shows[userShows[1]] = {
                title: userShows[1],
                score: Number(userShows[13]),
                watched_episodes: userShows[10],
                image: userShows[8],
                totalScore: Number(userShows[13]),
                userCount: 1
              };
            }
            shows[userShows[1]].groupScore = Number(shows[userShows[1]].totalScore / shows[userShows[1]].userCount).toPrecision(3);
          }
        }
        // console.log('Shows: ', shows);
        this.showsTitles = Object.keys(shows);
        // console.log('titles: ', this.showsTitles);
        return this.groupShows = shows;
      })

      .catch((err) => {
        console.log(err);
      });
  }


}

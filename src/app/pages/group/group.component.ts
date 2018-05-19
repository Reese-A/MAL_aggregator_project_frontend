import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { SearchService } from '../../services/search.service';

@Component({
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent {
  userNames: any;
  usersData: Object[];
  usersSeries: any;


  constructor(private groupService: GroupService, private searchService: SearchService) {
    this.userNames = [];
    this.usersData = [];
    this.usersSeries = [];

    this.groupService.getGroup() // promise all

      .toPromise()
      .then((data: Array<any>) => {
        this.userNames = data.map(function (user) {
          return user.name;
        });
        return this.userNames;
      })

      .then((names) => {
        names.forEach((username) => {
          this.searchService.getData(username)

            .toPromise()
            .then((data) => {
              return this.usersData.push(data);
            })

            .then((data) => {
              return this.usersSeries = this.usersData.map(function (user) {
                return user['myanimelist']['anime'];
              });
            })

            .then((data) => {
              let userShows = [];
              // const showTitles = [];
              // const groupRankings = [];
              // const groupSeries = [];
              const shows = {};
              for (let i = 0; i < this.usersSeries.length; i++) {
                for (let j = 0; j < this.usersSeries[i].length; j++) {
                  userShows = Object.values(this.usersSeries[i][j]);
                  // console.log(userShows);
                  if (shows.hasOwnProperty(userShows[1])) {
                    shows[userShows[1]].totalScore += Number(userShows[13]);
                    shows[userShows[1]].userCount++;
                  } else {
                    shows[userShows[1]] = {
                      score: Number(userShows[13]),
                      watched_episodes: userShows[10],
                      image: userShows[8],
                      totalScore: Number(userShows[13]),
                      userCount: 1
                    };
                  }
                  shows[userShows[1]].groupScore = Number(shows[userShows[1]].totalScore / shows[userShows[1]].userCount).toPrecision(3);
                  // show[userShows[1]] = {
                  //   score: userShows[13],
                  //   watched_episodes: userShows[10],
                  //   image: userShows[8]
                  // };
                  // show['title'] = userShows[1];
                  // show['score'] = userShows[13];
                  // show['watched_episodes'] = userShows[10];
                  // show['image'] = userShows[8];
                  // showTitles.push(userShows[1]);
                  // groupRankings.push(show);
                  // groupSeries.push(this.usersSeries[i][j]);
                }
              }
              console.log('Shows: ', shows);
              // this.groupSeries.indexOf(Object.)
              // console.log('Titles: ', showTitles);
              // console.log('User Shows: ', userShows);
              // console.log('Group Rankings: ', groupRankings);
              // console.log('Group Series: ', groupSeries);
              return shows;
            })

            .catch((err) => {
              console.log(err);
            });
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }


}

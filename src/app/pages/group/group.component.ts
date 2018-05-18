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
  // groupSeries: Object[];
  // groupRankings: Object[];

  constructor(private groupService: GroupService, private searchService: SearchService) {
    this.userNames = [];
    this.usersData = [];
    this.usersSeries = [];
    // this.groupSeries = [];
    // this.groupRankings = [];

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
              const showTitles = [];
              const groupRankings = [];
              const groupSeries = [];
              for (let i = 0; i < this.usersSeries.length; i++) {
                for (let j = 0; j < this.usersSeries[i].length; j++) {
                  userShows = Object.values(this.usersSeries[i][j]);
                  const show = {};
                  show['title'] = userShows[1];
                  show['score'] = userShows[13];
                  showTitles.push(userShows[1]);
                  groupRankings.push(show);
                  groupSeries.push(this.usersSeries[i][j]);
                }
              }
              // this.groupSeries.indexOf(Object.)
              console.log('Titles: ', showTitles);
              // console.log('User Shows: ', userShows);
              console.log('Group Rankings: ', groupRankings);
              console.log('Group Series: ', groupSeries);
              return showTitles;
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

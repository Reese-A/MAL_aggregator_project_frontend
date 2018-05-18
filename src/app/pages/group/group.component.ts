import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { SearchService } from '../../services/search.service';

@Component({
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent {
  userNames: Object[];
  usersData: Object[];
  usersSeries: Object[];
  groupSeries: Object[];
  groupRankings: Object[];

  constructor(private groupService: GroupService, private searchService: SearchService) {
    this.userNames = [];
    this.usersData = [];
    this.usersSeries = [];
    this.groupSeries = [];
    this.groupRankings = [];

    this.groupService.getGroup()

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
              console.log(this.usersSeries);
              for (let i = 0; i < this.usersSeries.length; i++) {
                for (let j = 0; j < this.usersSeries[i].length; j++) {
                  const userShows = Object.values(this.usersSeries[i][j]);
                  const show = {};
                  show[userShows[1]] = userShows[13];
                  this.groupRankings.push(show);
                  console.log(this.groupRankings);
                  if (!this.groupSeries.includes(this.usersSeries[i][j])) {
                    this.groupSeries.push(this.usersSeries[i][j]);
                  }
                }
              }
              console.log('Group Series: ', this.groupSeries);
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

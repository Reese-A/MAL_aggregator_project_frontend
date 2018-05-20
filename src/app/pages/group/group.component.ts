import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent {
  userNames: any;
  usersSeries: any;
  groupShows: Object;
  showsTitles: Object[];
  loading: boolean;

  constructor(private groupService: GroupService, private router: Router) {
    this.userNames = [];
    this.usersSeries = [];
    this.groupShows = {};
    this.showsTitles = [];
    this.loading = true;

    this.groupService.getGroup()
      .toPromise()
      .then((data: Array<any>) => {
        if (data['message'] === 'Please sign in') {
          this.loading = false;
        }
        this.userNames = data.map(function (user) {
          return user.name;
        });
        return this.userNames;
      })

      .then((names) => {
        const promises = [];
        names.forEach((username) => {
          promises.push(this.groupService.getGroupData(username));
        });
        return promises;
      })
      .then((promises) => {
        return Promise.all(promises);
      })
      .then((data) => {
        return this.usersSeries = data.map(function (user) {
          return user['myanimelist']['anime'];
        });
      })

      .then((data) => {
        // console.log('HERE: ', data);
        // let userShows = [];
        const shows = {};
        for (let i = 0; i < this.usersSeries.length; i++) {
          for (let j = 0; j < this.usersSeries[i].length; j++) {
            const currentShow = this.usersSeries[i][j];
            if (currentShow['my_status'] === '2' && Number(currentShow['my_score']) > 0) {
              if (shows.hasOwnProperty(currentShow['series_title'])) {
                shows[currentShow['series_title']].totalScore += Number(currentShow['my_score']);
                shows[currentShow['series_title']].userCount++;
              } else {
                shows[currentShow['series_title']] = {
                  title: currentShow['series_title'],
                  score: Number(currentShow['my_score']),
                  watched_episodes: currentShow['my_watched_episodes'],
                  image: currentShow['series_image'],
                  totalScore: Number(currentShow['my_score']),
                  userCount: 1,
                  groupScore: 0
                };
              }
              // tslint:disable-next-line:max-line-length
              shows[currentShow['series_title']].groupScore = Number(shows[currentShow['series_title']].totalScore / shows[currentShow['series_title']].userCount).toPrecision(3);
            }
          }
        }
        // console.log('Shows: ', shows);
        this.showsTitles = Object.keys(shows).sort(function compare(a, b) {
          if (Number(shows[a]['userCount']) > Number(shows[b]['userCount'])) {
            return -1;
          }
          if (Number(shows[a]['userCount']) < Number(shows[b]['userCount'])) {
            return 1;
          }
          return 0;
        });
        this.loading = false;
        return this.groupShows = shows;
      })

      .catch((err) => {
        console.log(err);
      });
  }

  removeUser(name) {
    console.log(name);
    this.groupService.removeUser(name)
      .toPromise()
      .then((data) => {
        console.log(data);
        return window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  scrollUp() {
    return window.scrollTo(0, 0);
  }

}

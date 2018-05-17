import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { GroupService } from '../../services/group.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title: string;
  user: Object = {
    name: '',
  };
  userSeries: Object[];
  malUser: Object = {
    name: ''
  };
  hasData: boolean;

  constructor(private searchService: SearchService, private groupService: GroupService) {
    this.title = 'MAL Ratings Aggregator' || '';
    this.hasData = null;
  }

  addUser(user) {
    user = this.user;
    console.log('USER', user);
    this.groupService.addToGroup(user)
    .toPromise()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  submit(e) {
    e.preventDefault();

    this.searchService.getData(this.malUser)

      .toPromise()
      .then((data) => {
        console.log(data);

        if (data['myanimelist']) {
          this.hasData = true;
        } else {
          this.hasData = false;
        }

        this.user['name'] = data['myanimelist']['myinfo']['user_name'];

        const sortedSeries = data['myanimelist']['anime'].sort(function compare(a, b) {
          if (Number(a.my_score) > Number(b.my_score)) {
            return -1;
          }
          if (Number(a.my_score) < Number(b.my_score)) {
            return 1;
          }
          return 0;
        });
        this.userSeries = sortedSeries;

      })
      .catch((err) => {
        console.log(err);
      });
  }
}

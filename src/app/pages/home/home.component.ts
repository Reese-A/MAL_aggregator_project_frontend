import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

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

  constructor(private searchService: SearchService) {
    this.title = 'MAL Ratings Aggregator' || '';
    this.hasData = null;
  }

  submit(e) {
    e.preventDefault();
    console.log(e);
    this.searchService.getData(this.malUser)
      .toPromise()
      .then((data) => {
        console.log(data);
        if (data['myanimelist']) {
          this.hasData = true;
        } else {
          this.hasData = false;
        }
        this.user[name] = data['myanimelist']['myinfo']['user_name'];
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
        console.log(this.userSeries);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

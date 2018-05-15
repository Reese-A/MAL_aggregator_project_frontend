import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title: string;
  malUser: Object = {
    name: ''
  };

  constructor(private searchService: SearchService) {
    this.title = 'MAL Ratings Aggregator' || '';

  }


  submit(e) {
    e.preventDefault();
    console.log(e);
    this.searchService.getData(this.malUser)
      .toPromise()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

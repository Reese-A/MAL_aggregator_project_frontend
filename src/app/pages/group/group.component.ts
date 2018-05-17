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

  constructor(private groupService: GroupService, private searchService: SearchService) {
    this.userNames = [];
    this.usersData = [];
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
          .catch((err) => {
            console.log(err);
          });
        });
        return this.usersData;
      })
      .then((data) => {
        console.log(data);
        console.log('USERS DATA: ', this.usersData);
      });
  }


}

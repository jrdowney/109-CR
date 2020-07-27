import { Friend } from './../models/friend';
import { DataService } from './../service/data.service';
import { SharedService } from './../service/shared.service';
import { Post } from './../models/post';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  model = new Post();
  myFriends: Friend[] = [];

  constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => {
      this.myFriends = list.filter(f => f.friendOf === shared.userName);
    });
  }

  sendPost(){
    this.model.from = this.shared.userName;
    console.log('posting', this.model);
    // save the post
    this.data.sendPost(this.model);

    // clear the form
    this.model = new Post();
  }

}

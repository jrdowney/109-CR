import { SharedService } from './../service/shared.service';
import { DataService } from './../service/data.service';
import { Component } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  allPosts: Post[] = [];

  constructor(private data: DataService, private shared: SharedService) {}

  // fn gets called every time user navigates to tab 1
  ionViewDidEnter(){
   this.data.getAllPosts().subscribe(list => {
     console.log('exc subscription');

     // filter
      // to everyone, from you, to you
     list = list.filter(p => p.to == 'Everyone' || p.from == this.shared.userName || p.to == this.shared.userName);

     // sort the array
     this.allPosts = list.sort(function(left, right){
       if (left.timeStamp > right.timeStamp) {
         return -1;
       }
       else{
         return 1;
       }
     });
   });
  }
}

/**
   * inject data service
   * get the data from the dataService
   * put the array into a global variable
   * access the variable from an *ngFor on the html
   * display the text of the message
   */

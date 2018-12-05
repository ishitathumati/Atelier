import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'; 
import { ProfilePage } from '../profile/profile';
import { CommentsPage } from '../comments/comments';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  likeValue: number;

  

 
  constructor(public navCtrl: NavController) {
    this.likeValue = 0;
  }

 
  btnclicked(){
    this.navCtrl.push(CommentsPage);
  }

  ProfilePageClick(){
    this.navCtrl.push(ProfilePage);
  }

  handleLike(){
    this.likeValue++;
  }

  





/*export class likes{
  likeValue: number;
  dislikeValue: number;

    constructor(){
      this.likeValue = 0;
      this.dislikeValue = 0;
    }

    handleLike(){
      this.likeValue++;
    }
    handleDislike(){
      this.dislikeValue++;
    }*/
}

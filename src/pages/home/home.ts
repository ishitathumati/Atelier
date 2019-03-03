import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'; 
import { ProfilePage } from '../profile/profile';
import { CommentsPage } from '../comments/comments';
import { AngularFireDatabase } from 'angularfire2/database';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  
  likes: object[] = [];
  username: string = 'sahil\'sLike';
  s;
  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    this.s = this.db.list('/like').subscribe( data => {
      this.likes = data;
    });
    
  }


  btnclicked(){
    this.navCtrl.push(CommentsPage);
  }

  ProfilePageClick(){
    this.navCtrl.push(ProfilePage);
  }


  handleLike(){
    this.db.list('/like').push({
      username: this.username
    }).then(() => {

      //comment is sent

    }).catch(() => {

      //firebase is unreachable

    })
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
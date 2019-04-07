import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'; 
import { ProfilePage } from '../profile/profile';
import { CommentsPage } from '../comments/comments';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  
  likes: object[] = [];
  username: string = 'sahil\'sLike';
  s;
  allposts;

  constructor(public userservice:UserProvider, public navCtrl: NavController, public db: AngularFireDatabase) {
    this.s = this.db.list('/like').subscribe( data => {
      this.likes = data;

      this.userservice.getpostdetails2().then((list)=>{
        this.allposts =list;
        console.log('list of posts', this.allposts)
      });

    });
    firebase.storage().ref('explorePics').child('img1.png').delete();
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
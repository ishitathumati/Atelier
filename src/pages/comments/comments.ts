import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


//import { User } from '../../models/user';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  username: string = '';

  comment: string ='';
  s;
  comments: object[] = [];


  constructor
  ( public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {

    this.username = this.navParams.get('User'); // user is the parameter name that the person will send

      // this will log when ever there is a change in the firebase
      this.s = this.db.list('/comment').subscribe( data => {
       this.comments = data;
     });
  }


  sendComment(){
    this.db.list('/comment').push({
      //username: this.username,
      comment: this.comment
    }).then(() => {

      //comment is sent

    }).catch(() => {

      //firebase is unreachable

    })
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad CommentsPage');
  }

}

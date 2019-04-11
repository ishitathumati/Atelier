import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user';


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

  
  user = {} as User;
value;
  username: string = '';

  comment: string ='';
  s;
  comments: object[] = [];

  //firebase.auth().currentUser.uid

  constructor
  ( public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {

      this.value = this.navParams.get('postinfo'); // user is the parameter name that the person will send

      // this will log when ever there is a change in the firebase
      this.s = this.db.list('/comment').subscribe( data => {
      this.comments = data;
     });
  }

  


  sendCommenttodb(){

    this.db.list('/comment').push({
      username: this.user,
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

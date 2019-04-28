import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { FriendsPage } from '../friends/friends';
import { ChatProvider } from '../../providers/chat/chat'; 
/**
 * Generated class for the OtheruserfriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otheruserfriends',
  templateUrl: 'otheruserfriends.html',
})
export class OtheruserfriendsPage {

  myfriends;
  userid;
  username;


  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
    public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider) {

      this.userid=this.navParams.get('uid');
      console.log('id', this.userid)
      this.username=this.navParams.get('name');
      console.log('name', this.username)
  }

  ionViewWillEnter() {
   
    this.requestservice.getotherfriends(this.userid);
   
    this.events.subscribe('otherfriends', () => {
      this.myfriends = this.requestservice.otherfriends;
    })
  }
  
  ionViewDidLeave() {
  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
  

    

}


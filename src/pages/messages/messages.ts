/**
 * The code in this page is modeled after that found in https://tphangout.com/chat-app-with-ionic-3-firebase-ep-4-adding-friends/
 * https://tphangout.com/chat-app-with-ionic-3-firebase-ep-6-sending-requests/ and https://tphangout.com/chat-app-with-ionic-3-firebase-ep-7-accepting-and-ignoring-requests/
 * The author of the code in the above link: Raja Yogan
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { FriendsPage } from '../friends/friends';
//import { threadId } from 'worker_threads';
import { FriendchatPage } from '../friendchat/friendchat';
import { ChatProvider } from '../../providers/chat/chat'; 
import { Profile } from '../../models/profile';
import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  profile = {} as Profile;

  myrequests;
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
    public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider) {
  }

  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }
  
  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friend');
  }
 
  addfriend() {
    this.navCtrl.push(FriendsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
  
  
    ignore(item) {
      this.requestservice.deleterequest(item).then(() => {
        alert('Request ignored');
      }).catch((err) => {
        alert(err);
      })
    }

    friendchat(friend) {
      this.chatservice.initializebuddy(friend);
      this.navCtrl.push('FriendchatPage');
    } 

    
       




}

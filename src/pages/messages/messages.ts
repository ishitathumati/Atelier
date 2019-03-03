import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { FriendsPage } from '../friends/friends';
import { threadId } from 'worker_threads';
import { FriendchatPage } from '../friendchat/friendchat';
import { ChatProvider } from '../../providers/chat/chat';

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
  
 
  accept(item) {
      this.requestservice.acceptrequest(item).then(() => {
  
        let newalert = this.alertCtrl.create({
          title: 'Friend added',
          subTitle: 'Tap on friend to chat',
          buttons: ['ok']
        });
        newalert.present();
      })
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

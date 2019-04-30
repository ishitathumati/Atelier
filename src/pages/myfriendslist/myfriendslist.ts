import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { FriendsPage } from '../friends/friends';
//import { threadId } from 'worker_threads';
import { FriendchatPage } from '../friendchat/friendchat';
import { ChatProvider } from '../../providers/chat/chat'; 

/**
 * Generated class for the MyfriendslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myfriendslist',
  templateUrl: 'myfriendslist.html',
})
export class MyfriendslistPage {
  myrequests;
  myfriends;
  search;
  friendsarr;

  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
    public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider) {

      this.requestservice.getmyfriends();
  
      this.events.subscribe('friends', () => {
      this.friendsarr=this.requestservice.myfriends;
      this.myfriends = this.requestservice.myfriends;
      console.log(this.myfriends)
    })
  }

  ionViewWillEnter() {
    
    this.requestservice.getmyfriends();
  
    this.events.subscribe('friends', () => {
      this.myfriends = this.requestservice.myfriends;
    })
  }
  
  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friend');
  }

  searchfriends(searchbar) {
    this.friendsarr = this.myfriends;
    var val = searchbar.target.value;
    if (val.trim() == '') {
      return;
    }
     this.friendsarr = this.friendsarr.filter((v) => {
      if (v.displayName && typeof v.displayName === "string" && v.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }
 
  addfriend() {
    this.navCtrl.push(FriendsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
  

    

}

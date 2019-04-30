/**
  Some of the code in this page is modeled from that of https://tphangout.com/chat-app-with-ionic-3-firebase-ep-8-one2one-chat/
  Author of code from above link: Raja Yogan
 */

import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import  firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { AngularFireAuth } from 'angularfire2/auth'; 


/**
 * Generated class for the FriendchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friendchat',
  templateUrl: 'friendchat.html',
})
export class FriendchatPage {
  @ViewChild('content') content: Content;
  friend: any;
  newmessage;
  allmessages;
  friendimg;
  userimg;

  constructor(public aAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider, public events: Events, public zone: NgZone, public userservice: UserProvider) {
    this.friend = this.chatservice.friend;
    this.getfriendimg(this.friend.uid);
    this.getuserimg(this.aAuth.auth.currentUser.uid);
    console.log('friend', this.friend)
    
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.zone.run(() => {
        this.allmessages = this.chatservice.friendmessages;
        console.log('messages', this.allmessages)
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendchatPage');
  }

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.chatservice.getfriendmessages();
  }
 
  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  getfriendimg(uid){
    this.userservice.getuserdetails2(uid).then((res:any)=>{
      this.friendimg = res.photoURL;
      console.log('friend image', this.friendimg)
    })
  }

  getuserimg(uid){
    this.userservice.getuserdetails2(uid).then((res:any)=>{
      this.userimg = res.photoURL;
      console.log('user image', this.userimg)
    })
  }
}

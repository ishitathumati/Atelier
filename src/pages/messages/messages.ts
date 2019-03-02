import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { FriendsPage } from '../friends/friends';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
    public events: Events) {
  }

  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
  }
  
  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }
 
  addfriend() {
    this.navCtrl.push(FriendsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}

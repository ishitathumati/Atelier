import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage { 
  
  persons: AngularFireList <any>;


  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  
    this.db.list('/profiles');
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
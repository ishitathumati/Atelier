import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Platform} from 'ionic-angular';
import{ Firebase } from '@ionic-native/firebase/ngx';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'; 
import firebase from 'firebase';


/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public aAuth:AngularFireAuth, public platform:Platform, public db: AngularFireDatabase, public firebaseNative: Firebase, public http: HttpClient) {
    console.log('Hello NotificationProvider Provider');
  }

  async getToken(){
    let token;
    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken()
    }

    if(!this.platform.is('cordova')){
      //TODO
    }
  return this.saveToken(token)

  }

  private saveToken(token){

    if(!token) return;

    const deviceref = firebase.database().ref('/devices')

    const docdata = {
      token,
      userid: this.aAuth.auth.currentUser.uid
    }

    return deviceref.child(token).set(docdata)
  }

  listentoNotifs(){
    return this.firebaseNative.onNotificationOpen()
  }
}

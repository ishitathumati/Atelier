//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular'; 

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  firefriendchats = firebase.database().ref('/friendchats');
  friend: any;
  friendmessages = [];
  constructor(public events: Events) {
    console.log('Hello ChatProvider Provider');
  }

  


initializebuddy(friend) {
    this.friend = friend;
  }

addnewmessage(msg) {
    if (this.friend) {
      var promise = new Promise((resolve, reject) => {
        this.firefriendchats.child(firebase.auth().currentUser.uid).child(this.friend.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firefriendchats.child(this.friend.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
          })
        })
      })
      return promise;
    }
  }

  getfriendmessages() {
    
    let temp;
    this.firefriendchats.child(firebase.auth().currentUser.uid).child(this.friend.uid).on('value', (snapshot) => {
      this.friendmessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.friendmessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }


}

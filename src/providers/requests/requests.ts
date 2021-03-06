/**
 * The code in this page is modeled from that in https://tphangout.com/chat-app-with-ionic-3-firebase-ep-6-sending-requests/
 * and https://tphangout.com/chat-app-with-ionic-3-firebase-ep-7-accepting-and-ignoring-requests/
 * The author of the code in the above link: Raja Yogan
 */

import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { connreq } from '../../models/request';
import { UserProvider } from '../user/user';
import firebase from 'firebase';
 
/*
  Generated class for the RequestsProvider provider.
 
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');
  userdetails;
  myfriends;
  otherfriends;
  firedata = firebase.database().ref('/friends');

  constructor(public userservice: UserProvider, public events: Events) {
    
  }
 
  sendrequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
      sender: req.sender
      }).then(() => {
        resolve({ success: true });
        }).catch((err) => {
          resolve(err);
    })
    })
    return promise;  
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.userservice.getallusers().then((res) => {
        var allusers = res;
        this.userdetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })
 
  })
}  

acceptrequest(friend) {
  var promise = new Promise((resolve, reject) => {
    this.myfriends = [];
    this.firefriends.child(firebase.auth().currentUser.uid).push({
      uid: friend.uid
    }).then(() => {
      this.firefriends.child(friend.uid).push({
        uid: firebase.auth().currentUser.uid
      }).then(() => {
        this.deleterequest(friend).then(() => {
        resolve(true);
      })
      
      }).catch((err) => {
        reject(err);
       })
      }).catch((err) => {
        reject(err);
    })
  })
  return promise;
}

deleterequest(friend) {
  var promise = new Promise((resolve, reject) => {
   this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(friend.uid).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
       })
        .then(() => {
        
      }).catch((err) => {
        reject(err);
      })
  })
  return promise; 
}
getmyfriends() {
  let friendsuid = [];
  this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    let allfriends = snapshot.val();
    this.myfriends = [];
    for (var i in allfriends)
      friendsuid.push(allfriends[i].uid);
      
    this.userservice.getallusers().then((users) => {
      this.myfriends = [];
      for (var j in friendsuid)
        for (var key in users) {
          if (friendsuid[j] === users[key].uid) {
            this.myfriends.push(users[key]);
          }
        }
      this.events.publish('friends');
    }).catch((err) => {
      alert(err);
    })
  
  })
} 

getfilteredfriends(uid) {
  var promise = new Promise((resolve, reject) => {
    this.firedata.child(`${uid}`).once('value', (snapshot) => {
      let userdata = snapshot.val();
      let temparr = [];
      for (var key in userdata) {
        temparr.push(userdata[key]);
      }
      //console.log('users', temparr)
      resolve(temparr);
    }).catch((err) => {
      reject(err);
    })
  })
  return promise;
}

getotherfriends(userid) {
  let friendsuid = [];
  this.firefriends.child(`${userid}`).on('value', (snapshot) => {
    let allfriends = snapshot.val();
    this.otherfriends=[];
    for (var i in allfriends)
      friendsuid.push(allfriends[i].uid);
      
    this.userservice.getallusers().then((users) => {
      for (var j in friendsuid)
        for (var key in users) {
          if (friendsuid[j] === users[key].uid) {
            this.otherfriends.push(users[key]);
          }
        }
      this.events.publish('otherfriends');
    }).catch((err) => {
      alert(err);
    })
  
  })
} 


}

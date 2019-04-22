//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Events } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase'; 
//import Parse from 'parse';
import{Post} from '../../models/post';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users');
  postlist: any [];
  
  constructor(public events: Events, public afireauth: AngularFireAuth) {
    this.postlist = [];
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/atelier-842ac.appspot.com/o/profilePics%2Fdefault.jpeg?alt=media&token=ba12bc14-ef9a-4893-947a-90b58c9850fb'
      }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/atelier-842ac.appspot.com/o/profilePics%2Fdefault.jpeg?alt=media&token=ba12bc14-ef9a-4893-947a-90b58c9850fb'
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
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

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }

  getProfiledetails(){
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).child('profile').once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
        })
      })
      return promise;
  }
  


  /*getprofiledetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).child('profile').once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }*/
    
  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
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

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.afireauth.auth.currentUser.photoURL
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL,
        uid: this.afireauth.auth.currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
        this.afireauth.auth.currentUser.updateProfile({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl      
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
           })  
    })
    return promise;
}

updatebio(x){
  var promise = new Promise((resolve, reject)=>{ 
      this.firedata.child(`${this.afireauth.auth.currentUser.uid}/profile`).update({
        bio: x
      }).then(()=>{
        resolve({success: true});
      }).catch((e)=>{
        reject(e);
      })
  })
  return promise
}

/* Another way of getting post details. 
getpostdetails2() {
  var prom=new Promise((resolve, reject)=>{
    let temp;
    firebase.database().ref(`/users`).child(firebase.auth().currentUser.uid).child('posts').once('value', (snapshot) => {
      this.postlist = [];
      temp = snapshot.val();
      if(temp){
        let x = Object.values(temp)
        console.log('x is printed', x)
        this.postlist=x;
        console.log('postlist is printed', this.postlist)
        resolve(this.postlist);
      }
    }).catch((e)=>{
      reject(e);
    })  
  });
  return prom
}*/

getpostdetails2(){
  var prom=new Promise((resolve, reject)=>{
    let temp;
    firebase.database().ref(`/users`).child(firebase.auth().currentUser.uid).child('posts').once('value', (snapshot) => {
      this.postlist = [];
      temp = snapshot.val();
      if(temp){
        for (var key in temp) {
          this.postlist.push(temp[key]);
        }
      }
      console.log('posts', this.postlist)
      resolve(this.postlist);
    }).catch((err) => {
      reject(err);
    })
  })
  return prom;
}
getpostdetails3(userID: string){
  
  var self = this;
  var friends: string[] = [];
  firebase.database().ref('friends/'+userID).on('value', (snap) => {
    snap.forEach((snapshot) => {
      friends.push(snapshot.val().uid);
      return false;
    });
  });

  console.log(friends);
  var prom=new Promise((resolve, reject)=>{

    let temp;
    self.postlist = [];
    firebase.database().ref(`/users`).once('value', (snapshot) => {
      console.log(snapshot.val());
      snapshot.forEach(function(cSnap) {
        var k = cSnap.key;
        if(friends.indexOf(k) != -1) {
          firebase.database().ref('/users/'+k+'/posts').on('value', function(cShot) {
            if(cShot != null) {
              // console.log(cShot.val());
              cShot.forEach(function(thepost) {
                console.log(thepost.val());
                var tempk = thepost.key;
                firebase.database().ref('/users/'+k+'/posts/'+tempk).on('value', function(the) {
                  temp = the.val();
                  self.postlist.push(temp);
                  // console.log(temp);
                  resolve(self.postlist);
                });
                return false;
            });
            }
            else{
              reject('no posts');
            }
          });
        }
        return false;
        });
        return false;
      });

    });
    console.log(this.postlist);
  return prom;
}
/*updateUserPicsPosts(img){
  var prom = new Promise((resolve,reject)=>{
    this.getpostdetails2().then((data)=>{
      if(!data){
        
      }
      else{
        let posts;
        posts = data;
        for(var i=1; i<=posts.length;i++){
          posts[i].userpic = img;
          //console.log('this.posts[i].userpic', posts[i].userpic)
        }
      }
      resolve({status : true})
    }).catch((e)=>{
      reject(e)
      console.log('updateUserPicsPosts', e)
    })
  })
  return prom
}*/

}

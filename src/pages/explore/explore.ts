import { Component, Input } from '@angular/core';
//import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { storage } from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { User } from '../../models/users';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import * as firebase from 'firebase';
//import { a } from '@angular/core/src/render3';
//import {storage, initializeApp} from 'firebase';
import { RequestsProvider } from '../../providers/requests/requests';
import { UserProvider } from '../../providers/user/user';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { a } from '@angular/core/src/render3';
import {initializeApp} from 'firebase';
//import {navCtrl, initializeApp} from firebase;
import { connreq } from '../../models/request';
import { ProfilePage } from '../profile/profile';
import { Post } from '../../models/post';


/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})

export class ExplorePage {


  search: boolean;

  imageSource1; 
  imageSource2;
  imageSource3;
  imageSource4;

  dbPhoto1;
  dbPhoto2;
  dbPhoto3;
  dbPhoto4;
  posts : any [];
  newrequest = {} as connreq;
  allHashtags = [];
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController, public requestservice: RequestsProvider) {
      this.posts = [];
      this.search == false;
      this.imageSource1 = 'bluemount';
      this.imageSource2 = 'dusk';
      this.imageSource3 = 'scream';
      this.imageSource4 = 'starrynight';

      this.getPhotoURL();


      this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;

  });
  }

  searchuser(searchbar) {
    this.search = true;
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })

    // this.search == false;

    if(q == '') {
      this.search = false;
    }
  }

  

  goToProfile()
  {
    this.navCtrl.push(ProfilePage);
  }
  
  getPhotoURL()
  {
    var self = this;
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref(`/users`).on('value', (snapshot) => {
        snapshot.forEach(function(userStuff) {
          var key = userStuff.key;
          firebase.database().ref('/users/'+key+'/posts').on('value', function(shot) {
            shot.forEach(function(shotChild) {
              var keypost = shotChild.key;
              firebase.database().ref('/users/'+key+'/posts/'+keypost).on('value', function(thePost) {
                var s = thePost.val();
                var temp = {
                  'username': s.username,
                  'postid' : s.postid,
                  'price' : s.price,
                  'title' : s.title,
                  'description' : s.description,
                  'posturl' : s.posturl,
                  'hashtag' : s.hashtag
                } as Post;
                self.posts.push(temp);
              });
              return false;
            });
          });
          return false;
        });
      });
    });
    return promise;
  }


  hastagExists(hashtag) {
    firebase.database().ref('hastags').on('value', function(snapshot) {
      snapshot.forEach(function(snap) {
        this.allHashtags.push(snap.val()); //push the hashtag
        return false;
      });
    });
     //check if the hashtag entered is in the array of hashtags
    var doesExist: boolean = false;
    for(var i:number = 0; i<this.allHashtags.length; i++) {
      if(this.allHashtags[i] == hashtag) {
        doesExist = true;
      }
    }
    //if hashtag doesn't exist, push to the table of hashtags in firebase
    if(!doesExist) {
      this.allHashtags.push(hashtag);
      firebase.database().ref('hashtags').push(this.allHashtags);
      //firebase.database().ref('hashtags').set(this.allHashtags);
    }
  }

  /*searchOnEnter(e){
    e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('btnSearch').click();
        return false;
    }
    return true;
  }*/

}




import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { User } from '../../models/users';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AngularFireModule } from 'angularfire2';
//import { FIREBASE_CONFIG } from '../../app/firebase.config';
//import { UserUploadsPage } from '../user-uploads/user-uploads';
import * as firebase from 'firebase';
//import {storage, initializeApp} from 'firebase';
//import {navCtrl, initializeApp} from firebase;

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

  public userslist : Array<any>;
  public loadedUserslist: Array<any>;
  public usersRef: firebase.database.Reference;

  //galleryimage: any;

  /*pics=['bluemount.png', 
        'dusk.png',
        'img1.png',
        'img2.png',
        'img3.png',
        'img4.png',
        'img5.png',
        'img6.png',
        'img7.png',
        'img8.png',
        'img9.png',
        'img10.png',
        'img11.png',
        'img12.png',
        'scream.png',
        'starrynight.png'];*/

    imageSource;
    imageSource2;
    imageSource3;
    dbPhoto1;
    dbPhoto2;
    dbPhoto3;

  /*
  usersRef: Is for creating a database reference so we can pull the data from Firebase.
  userslist: Is to store the list of user names we’re pulling from Firebase.
  loadedUserslist


  */



  //private userlist = this.db.list<User>('users-list');
  
  constructor (public aAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    //initializeApp(FIREBASE_CONFIG);
    //firebase.initializeApp(config);
    /*this.imageSource = ['bluemount',
                       'dusk',
                       'img1',
                       'img2',
                       'img3',
                       'img4',
                       'img5',
                       'img6',
                       'img7',
                       'img8',
                       'img9',
                       'img10',
                       'img11',
                       'img12',
                       'scream',
                       'starrynight'];*/


      this.imageSource = 'bluemount';
      this.imageSource2 = 'dusk';
      this.imageSource3 = 'scream';
      this.getPhotoURL();
    //this.userslist = db.list('/usernames');

    //this willl open a reference to our firebase data under the /users node
    this. usersRef = firebase.database(). ref('/users');
    this. usersRef.on('value', userslist=>{
      let users = [];
      userslist.forEach(user=>{
        users.push(user.val());
        return false;
      });
      this.userslist = users;
      this.loadedUserslist= users;
    })

    
  }


  initializeItems() : void{
    this.userslist = this.loadedUserslist;
  }

  getItems(searchbar){
    this.initializeItems();
    var q = searchbar.srcElement.value;
    if(!q){
      return;
    }
    this.userslist = this.userslist.filter((v)=> {
      if(v.name && q) {
        if(v.name.toLowerCase().indexOf(q.toLowerCase())>-1){
          return true;
        }
        return false;
      }
    })
  }



  getuserslist() 
  {
    return this.userslist;
  }


  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ExplorePage');
  }

  getPhotoURL()
  {
    firebase.storage().ref().child('explorePics/' + this.imageSource+ '.png').getDownloadURL().then((url)=>{
      this.dbPhoto1=url;
    })

    firebase.storage().ref().child('explorePics/' + this.imageSource2 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto2=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource3 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto3=url;
    })

  }



  //HASH TAG STUFF

  //pictures on explore page should be stored in firebase
  //pictures should include captions with #
  //hash tag bar shoudl be able to read/fileter hashtag through the pictures. 
  
  

















}




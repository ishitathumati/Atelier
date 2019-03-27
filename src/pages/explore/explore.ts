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

 //hashtag function
 //search bar accesses uid
 //hash tag bar accesses post id 
@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  public userslist : Array<any>;
  public loadedUserslist: Array<any>;
  public usersRef: firebase.database.Reference;



    imageSource; 
    imageSource2;
    imageSource3;
    imageSource4;
    imageSource5;
    imageSource6;
    imageSource7;
    imageSource8;
    imageSource9;
    imageSource10;
    imageSource11;
    imageSource12;
    imageSource13;
    imageSource14;
    imageSource15;
    imageSource16;
    imageSource17;
    

    dbPhoto1;
    dbPhoto2;
    dbPhoto3;
    dbPhoto4;
    dbPhoto5;
    dbPhoto6;
    dbPhoto7;
    dbPhoto8;
    dbPhoto9;
    dbPhoto10;
    dbPhoto11;
    dbPhoto12;
    dbPhoto13;
    dbPhoto14;
    dbPhoto15;
    dbPhoto16;
    dbPhoto17;
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
      this.imageSource4 = 'starrynight';
      this.imageSource5 = 'img1';
      this.imageSource6 = 'img10';
      this.imageSource7 = 'img11';
      this.imageSource8 = 'img12';
      this.imageSource9 = 'img2';
      this.imageSource10 = 'img3';
      this.imageSource11 = 'img4';
      this.imageSource12 = 'img5';
      this.imageSource13 = 'img6';
      this.imageSource14= 'img7';
      this.imageSource15= 'img8';
      this.imageSource16= 'img9';
      this.imageSource17= 'rabbi'


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

  //getting urls from firebase
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
    firebase.storage().ref().child('explorePics/' + this.imageSource4 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto4=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource5 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto5=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource6 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto6=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto7=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto8=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto9=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto10=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto11=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto12=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto13=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto14=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto15=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto16=url;
    })
    firebase.storage().ref().child('explorePics/' + this.imageSource7 + '.png').getDownloadURL().then((url)=>{
      this.dbPhoto17=url;
    })
    

  }



  //HASH TAG STUFF:
  /* Hashtag bar should display random pictures for the user to scroll through

  */
  
  

















}




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
<<<<<<< HEAD
import { ProfilePage } from '../profile/profile';
//import {storage, initializeApp} from 'firebase';
=======
import {initializeApp} from 'firebase';
>>>>>>> 9d3e9d8048e737986e99f8c7f461ffadc1a17cfe
//import {navCtrl, initializeApp} from firebase;
import { connreq } from '../../models/request';

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


  imageSource1; 
  imageSource2;
  imageSource3;
  imageSource4;

  dbPhoto1;
  dbPhoto2;
  dbPhoto3;
  dbPhoto4;

  newrequest = {} as connreq;
  
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController, public requestservice: RequestsProvider) {


      this.imageSource1 = 'bluemount';
      this.imageSource2 = 'dusk';
      this.imageSource3 = 'scream';
      this.imageSource4 = 'starrynight';

      this.getPhotoURL();


      this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;

      

      
      })
  }
  


  /* sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Request sent to ' + recipient.displayName,
        buttons: ['ok']
      });
    
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  } */
  
  searchuser(searchbar) {
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

    
  }



  
  getPhotoURL()
  {
    firebase.storage().ref().child('explorePics/' + this.imageSource1+ '.png').getDownloadURL().then((url)=>{
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

  /* public userslist : Array<any>;
  public loadedUserslist: Array<any>;
  public usersRef: firebase.database.Reference; */



/*     imageSource; 
    imageSource2;
    imageSource3;
    


    dbPhoto1;
    dbPhoto2;
    dbPhoto3; */
    
  /*
  usersRef: Is for creating a database reference so we can pull the data from Firebase.
  userslist: Is to store the list of user names we’re pulling from Firebase.
  loadedUserslist


  */



  //private userlist = this.db.list<User>('users-list');
  
 /*  constructor (public aAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  


      this.imageSource = 'bluemount';
      this.imageSource2 = 'dusk';
      this.imageSource3 = 'scream'; */
      
      


  /*     this.getPhotoURL();
    //this.userslist = db.list('/usernames');

    //this willl open a reference to our firebase data under the /users node
    /*this. usersRef = firebase.database(). ref('/users');
    this. usersRef.on('value', userslist=>{
      let users = [];
      userslist.forEach(user=>{
        users.push(user.val());
        return false;
      });
      this.userslist = users;
      this.loadedUserslist= users;
    })*/

    

    
  


  /*initializeItems() : void{
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
  } */




  















}



}
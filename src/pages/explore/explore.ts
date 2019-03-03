import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { User } from '../../models/users';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
//import { UserUploadsPage } from '../user-uploads/user-uploads';
import firebase from 'firebase';

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

  /*
  usersRef: Is for creating a database reference so we can pull the data from Firebase.
  userslist: Is to store the list of user names we’re pulling from Firebase.
  loadedUserslist


  */



  //private userlist = this.db.list<User>('users-list');
  
  constructor (public aAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    //initializeApp(FIREBASE_CONFIG);
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



  getuserslist() {
    return this.userslist;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
  }




  //HASH TAG STUFF

  //pictures on explore page should be stored in firebase
  //pictures should include captions with #
  //hash tag bar shoudl be able to read/fileter hashtag through the pictures. 
  
  

















}




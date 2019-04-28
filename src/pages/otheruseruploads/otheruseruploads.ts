import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AddArtPage } from '../add-art/add-art';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { Post } from '../../models/post';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostPage } from '../post/post';

/**
 * Generated class for the OtheruseruploadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otheruseruploads',
  templateUrl: 'otheruseruploads.html',
})
export class OtheruseruploadsPage {

  post = {} as Post; 
  userid;
  username;
  displayName :any;
  allposts;
  postData: FirebaseObjectObservable<Post>;
  rootref:any;
  postref:any;
  postkey:any;
  commentref:any;
  postURL:any;

  constructor(public zone: NgZone, public events: Events, private afAuth: AngularFireAuth, 
    public userservice: UserProvider, public navCtrl: NavController, public navParams: NavParams
  ,private fdb: AngularFireDatabase) {

    this.userid=this.navParams.get('uid');
    this.username=this.navParams.get('name');
    this.getuserpostdetails(this.userid).then((list)=>{
      console.log('temp', list);
      this.allposts = list;
      console.log('inside new post subscribe,', this.allposts)

    });

  }

  goToPost(item){
    this.navCtrl.push(PostPage,{post:item}); //pushing post to userupload page as well as navigating to the page
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserUploadsPage');
    this.getuserpostdetails(this.userid).then((list)=>{
      console.log('temp', list);
      this.allposts = list;
      console.log('allposts', this.allposts)
    });

  }

  ionViewDidEnter() {
     this.getuserpostdetails(this.userid).then((list)=>{
      console.log('temp', list);
      this.allposts = list;
      console.log('allposts', this.allposts)

    });

  }

  loadName() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
    })
    return this.displayName
  }

 getuserpostdetails(uid){
  var prom=new Promise((resolve, reject)=>{
    let temp;
    firebase.database().ref(`/users`).child(`${uid}`).child('posts').once('value', (snapshot) => {
      let postlist = [];
      temp = snapshot.val();
      if(temp){
        for (var key in temp) {
          postlist.push(temp[key]);
        }
      }
      console.log('posts', postlist)
      resolve(postlist);
    }).catch((err) => {
      reject(err);
    })
  })
  return prom;
}
 
}


//import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { storage } from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { User } from '../../models/users';
import { HomePage } from '../home/home';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { a } from '@angular/core/src/render3';
import {initializeApp} from 'firebase';
import { ProfilePage } from '../profile/profile';
import { Post } from '../../models/post';
import { all } from 'q';
import { ExplorePage} from '../explore/explore';
import { Component, Input } from '@angular/core';
import firebase from 'firebase';
import { RequestsProvider } from '../../providers/requests/requests';
import { UserProvider } from '../../providers/user/user';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { connection } from '../../models/request';
import { AngularFireAuth } from 'angularfire2/auth';
import { OtheruserprofilePage } from '../otheruserprofile/otheruserprofile';

/**
 * Generated class for the PhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  
  search: boolean;
  rootref:any;
  hashref:any;
  haskey:any;

  imageSource1; 
  imageSource2;
  imageSource3;
  imageSource4;

  dbPhoto1;
  dbPhoto2;
  dbPhoto3;
  dbPhoto4;

  posts : any [];
  newrequest = {} as connection;
  temparr = [];
  filteredusers = [];
  allHashtags = []; //array of hashtags
  hashtag; //input
  specificpost;
  specificprofile;
  likes: number;
  comments: number;
 

  username;
  user;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController, public requestservice: RequestsProvider, private aAuth: AngularFireAuth) {
      this.specificpost = this.navParams.get('post');
      console.log('post',this.specificpost)
      this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;
     
      })
      this.posts = [];
      this.search == false;
      this.imageSource1 = 'bluemount';
      this.imageSource2 = 'dusk';
      this.imageSource3 = 'scream';
      this.imageSource4 = 'starrynight';
      this.likes = 0;
      this.comments = 0;
      try {
        this.likes = this.specificpost.likes.length;
        this.comments = this.specificpost.comments.length;
      } catch {

      }
      //this.userid =firebase.auth().currentUser.uid;
  }

  gotoOther(){
    this.navCtrl.push(OtheruserprofilePage, {userid:this.specificpost.userid, username:this.specificpost.username, userpic:this.specificpost.userpic})
  }



  /* sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender == this.newrequest.recipient)
      alert('You cannot send a request to yourself!');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request was sent!',
        subTitle: 'Request sent to ' + recipient.displayName,
        buttons: ['OK']
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
  }

 */




/* 
liked(i){
  // console.log(this.allposts[i].likes)
  if(this.specificpost[i].likes==null)
              this.specificpost[i].likes=[];
  this.specificpost[i].likes.push(firebase.auth().currentUser.uid);
  // console.log(this.allposts[i].likes)
 this.updatelikes(this.specificpost[i]).then(()=>{
  //  console.log('like updated');
 })
} */

 

/* gotoOther3(specificpost){
  this.navCtrl.push(TestPage, {userid: specificpost.userid, username:specificpost.username, userpic:specificpost.posturl});
}  */




 getComments(i) {
  var comm: any [];
  comm = [];
  // console.log('list of posts', this.allposts);
  firebase.database().ref('users/'+this.specificpost.userid+'/posts/'+this.specificpost[i].postid+'/comments').on('value', (snap) => {
    snap.forEach((snapshot) => {
      firebase.database().ref('users/'+this.specificpost.userid+'/posts/'+this.specificpost[i].postid+'/comments/'+snapshot.key).on('value', (comment) => {
        comm.push(comment.val());
      });
      return false;
    });
  });
  // comm = this.allposts[i].comments;
  // console.log(comm);
  // console.log(this.allposts[i].comments);
  // console.log('list of posts', this.allposts);
  return comm;
}


/* gives uid of undefined error
sendreq(recipient) {
  this.newrequest.sender = firebase.auth().currentUser.uid;
  this.newrequest.recipient = recipient.uid;
  if (this.newrequest.sender == this.newrequest.recipient)
    alert('You cannot send a request to yourself!');
  else{
    let successalert = this.alertCtrl.create({
      title: 'Request was sent!',
      subTitle: 'Request sent to ' + recipient.displayName,
      buttons: ['OK']
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





//error: Firebase.child failed: First argument was an invalid path: "undefined". Paths must be non-empty strings and can't contain ".
  sendreq() {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    console.log(this.specificpost);
    this.newrequest.recipient = this.specificpost.userid;
    if (this.newrequest.sender == this.newrequest.recipient)
      alert('You cannot send a request to yourself!');
    else{
      let successalert = this.alertCtrl.create({
        title: 'Request was sent!',
        subTitle: 'Request sent to ' + this.specificpost.username,
        buttons: ['OK']
      });
    
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }


  
  ionViewWillEnter(){
  }
  
  ionViewDidEnter(){
  }
  
  }
  
  



  

  




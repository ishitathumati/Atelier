import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Events } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Profile } from '../../models/profile';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { Post } from '../../models/post';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreq } from '../../models/request';
import { OtheruserfriendsPage } from '../otheruserfriends/otheruserfriends';
import { OtheruseruploadsPage } from '../otheruseruploads/otheruseruploads';

/**
 * Generated class for the OtherProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-profile',
  templateUrl: 'other-profile.html',
})
export class OtherProfilePage {

  post = {} as Post; 
  profile = {} as Profile;
  user;
  username;
  userpic;
  profileData: FirebaseObjectObservable <Profile>;
  bio='+ Add bio';
  name1: any;
  postlist;
  firedata = firebase.database().ref(`/users`);
  allposts;
  postData: FirebaseObjectObservable<Post>;
  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];

  constructor(public events:Events, private afAuth: AngularFireAuth, public zone: NgZone, public alertCtrl: AlertController, public db: AngularFireDatabase, public userservice: UserProvider, public navCtrl: NavController, private toast: ToastController, public navParams: NavParams, private camera:Camera, public popoverCtrl: PopoverController, public requestservice: RequestsProvider) {

  
    this.user=this.navParams.get('userid');
    console.log('user', this.user)
    this.username=this.navParams.get('username');
    console.log('username', this.username)
    this.userpic=this.navParams.get('userpic');
    console.log('userpic', this.navParams)

    this.getotheruserposts(this.user).then((list)=>{
      //this.allposts = Object.values(list);
      console.log('temp', list);
      this.allposts = list;
      console.log('inside new post subscribe,', this.allposts)

    });
      
  }

  loadProfiledetails(){
    this.getotheruserdetails(this.user).then((res:any)=>{
      if(!res.bio || res.bio == null){
        this.bio = "+ Add Bio";
      }
      else{
        this.bio = res.bio;
      }
      console.log('bio', res.bio);
    })
  }

  getotheruserdetails(uid:string){
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(`${uid}/profile`).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
        })
      })
      return promise;
  }

  gotofriends(){
    this.navCtrl.push(OtheruserfriendsPage);
  }

  gotoposts(){
    this.navCtrl.push(OtheruseruploadsPage);
  }

  goback(){
    this.navCtrl.pop();
  }

  getotheruserposts(uid:string){
    var prom=new Promise((resolve, reject)=>{
      let temp;
      this.firedata.child(`${uid}/posts`).once('value', (snapshot) => {
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

  ionViewDidLoad() {
    this.profileData = this.db.object(`users/${this.user}/profile`)
    console.log('ionViewDidLoad ProfilePage', this.profileData, this.user);
}


ionViewWillEnter(){
}

ionViewDidEnter(){
}

}

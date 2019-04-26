import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, Events } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Profile } from '../../models/profile';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { PopoverComponent } from '../../components/popover/popover';
import { MyfriendslistPage } from '../myfriendslist/myfriendslist';
import { MessagesPage } from '../messages/messages';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { Post } from '../../models/post';

/** 
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otheruserprofile',
  templateUrl: 'otheruserprofile.html',
})
export class OtheruserprofilePage { 
  
  post = {} as Post; 
  profile = {} as Profile;
  persons: FirebaseListObservable <any>;
  user;
  username;
  userpic;
  profileData: FirebaseObjectObservable <Profile>;
  item:any;
  personList:any;
  name: string;
  bio='+ Add bio';
  name1: any;
  postlist;
  //loadImage:any;
  imagesource: any;
  profilepic: any;
  displayName: any;
  firedata = firebase.database().ref(`/users`);
  status:any;
  disabled = false;
  allposts;
  postData: FirebaseObjectObservable<Post>;

  constructor(public events:Events, private afAuth: AngularFireAuth, public zone: NgZone, public alertCtrl: AlertController, public db: AngularFireDatabase, public userservice: UserProvider, public navCtrl: NavController, private toast: ToastController, public navParams: NavParams, private camera:Camera, public popoverCtrl: PopoverController) {

    //this.loadProfiledetails(); 

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
    this.navCtrl.push(MyfriendslistPage);
  }

  gotoposts(){
    this.navCtrl.push(UserUploadsPage);
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
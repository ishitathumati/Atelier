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
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage { 
  
  post = {} as Post; 
  profile = {} as Profile;
  persons: FirebaseListObservable <any>;

  profileData: FirebaseObjectObservable <Profile>;
  item:any;
  personList:any;
  name: string;
  bio='+ Add bio';
  name1: any;
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

    this.loaduserdetails(); 
    this.loadProfiledetails(); 

    this.userservice.getpostdetails2().then((list)=>{
      //this.allposts = Object.values(list);
      console.log('temp', list);
      this.allposts = list;
      console.log('inside new post subscribe,', this.allposts)

    });
      
  }

  loadProfiledetails(){
    this.userservice.getProfiledetails().then((res:any)=>{
      if(!res.bio || res.bio == null){
        this.bio = "+ Add bio";
      }
      else{
        this.bio = res.bio;
      }
      console.log('bio', res.bio);
    })
    return this.bio;
  }

  loaduserdetails() { 
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.profilepic = res.photoURL;
      })
    })
  }


  getItem(key: string): FirebaseObjectObservable<Profile> {
    this.item = this.db.object(`users/${this.afAuth.auth.currentUser.uid}/profile/${key}`)
    return this.item
  }
  
  getpostdetails() {
    var promise = new Promise((resolve, reject) => {
    firebase.database().ref(`/users`).child(firebase.auth().currentUser.uid).child('posts').once('value', (snapshot) => {
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

  gotomessages(){
    this.navCtrl.push(MessagesPage);
  }

addbio(){
    let bioalert = this.alertCtrl.create({
      buttons:[{
        text:'okay',
        role:'okay',
        handler: data=>{
          //this.updatebio(data)
        }
      }]
    });
    let bioalert2 = this.alertCtrl.create({
      title:'Add Bio',
      inputs: [{name:'name',
                placeholder:'Tell us something about yourself'
              }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
 
        }
      },
      {
        text: 'save',
        handler: data => {
          if (data.name) {
            this.userservice.updatebio(data.name).then((res:any) => {
              if (res) 
              {
                console.log('status', res)
                bioalert.setTitle('Bio Added!');
                bioalert.present();
                this.zone.run(() => {
                this.bio = data.name;
                })
              }     
          })
        }
          else {
            bioalert.setTitle('Failed');
            bioalert.setSubTitle('Could not add bio!');
            bioalert.present();
          }
        }
        
      }]
    });
    bioalert2.present();
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Display Name',
      inputs: [{
        name: 'name',
        placeholder: 'Your Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
 
        }
      },
      {
        text: 'Edit',
        handler: data => {
          if (data.name) {
            this.userservice.updatedisplayname(data.name).then((res: any) => {
              if (res.success) 
              {
                console.log('status', res.success)
                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your name has been changed successfully!');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.name;
                })
              }
              else {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your name was not changed');
                statusalert.present();
              }
                             
            })
          }
        }
        
      }]
    });
    alert.present();
  }

  /*getProfilePicture(){
  try{
    let userid = this.afAuth.auth.currentUser.uid;
    this.imagesource = storage().ref().child(`profilePics/${userid}/img`);
    
      storage().ref().child(`profilePics/${userid}/img`).getDownloadURL()
      .then((url)=>{
        console.log('profile pic url', url);
        this.profilepic = url
        
    }).catch(()=>{
      this.profilepic = 'https://firebasestorage.googleapis.com/v0/b/atelier-842ac.appspot.com/o/profilePics%2Fdefault.jpeg?alt=media&token=ba12bc14-ef9a-4893-947a-90b58c9850fb';
    });
  }
  catch (e){
    console.error(e);
    }
  }*/

presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(PopoverComponent);
  popover.present({
    ev: myEvent
  });
  }


  ionViewDidLoad() {
    this.loaduserdetails();
    //this.loadProfiledetails();
    console.log('ionViewDidLoad ProfilePage');
    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        this.profileData = this.db.object(`users/${data.uid}/profile`)
      }
      else {
        this.toast.create({
          message: `Authentication details missing`,
          duration: 3000
        }).present();
      }
  })
}

ionViewWillEnter(){
}

ionViewDidEnter(){
}

}
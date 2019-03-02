import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';

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
  
  profile = {} as Profile;
  persons: FirebaseListObservable <any>;

  profileData: FirebaseObjectObservable <Profile>;

  personList:any;
  loadImage:any;
  imagesource;
  profilepic;
  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, private toast: ToastController, public navParams: NavParams, private camera:Camera) {

    this.imagesource = 'profilePic'
    this.ProfilePicture();

   /* this.persons =this.db.list('/profiles');
    this.persons.subscribe((items)=>{
       this.personList=items
    } );*/
  
  }

  ProfilePicture(){
    //let storageRef = firebase.storage().ref();
    storage().ref().child('pictures/profilePic').getDownloadURL()
      .then((url)=>{
        this.profilepic = url
    //let userID = this.afAuth.auth.currentUser.uid;
      //storageRef.child(`profile/${userID}/img`).put(blob);
     /* storageRef.child(`profile/${userID}/img`).getDownloadURL()
      .then((url)=>{
        let profilepic = url
        return profilepic
        }).then((profilepic)=>{
          this.db.object(`profile/${userID}/`).update({photoURL: profilepic})*/
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to Atelier, ${data.email}`,
          duration: 3000
        }).present();
      this.profileData = this.db.object(`profile/${data.uid}`)
  }
      else{
        this.toast.create({
          message: `Authentication details missing`,
          duration: 3000
        }).present();
      }
  })
}
}
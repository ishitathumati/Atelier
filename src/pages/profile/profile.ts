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
  //loadImage:any;
  imagesource: any;
  profilepic: any;

  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, private toast: ToastController, public navParams: NavParams, private camera:Camera) {
    //this.loadImage = this.navParams.get('image');
    //this.imagesource = 'profilePic'
   /* this.persons =this.db.list('/profiles');
    this.persons.subscribe((items)=>{
       this.personList=items
    } );*/
    this.ProfilePicture();
  
  }

  ProfilePicture(){
  try{
    let userid = this.afAuth.auth.currentUser.uid;
    this.imagesource = storage().ref().child(`profilePics/${userid}/img`);
    if(this.imagesource == null){
      this.profilepic = 'https://firebasestorage.googleapis.com/v0/b/atelier-842ac.appspot.com/o/profilePics%2Fdefault.jpeg?alt=media&token=ba12bc14-ef9a-4893-947a-90b58c9850fb';
    }
    else{
      storage().ref().child(`profilePics/${userid}/img`).getDownloadURL()
      .then((url)=>{
        this.profilepic = url
        /*}).then((profilepic)=>{
          this.db.object(`profile/${userid}/`).update({photo: profilepic})*/
    });
  }
}
  catch (e){
    console.error(e);
    }
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
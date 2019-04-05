import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import {UserProvider} from '../../providers/user/user';


//import { AngularFireModule } from 'angularfire2';
//import { FIREBASE_CONFIG } from '../../app/firebase.config';


/**
 * Generated class for the EditProfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-prof',
  templateUrl: 'edit-prof.html',
})
export class EditProfPage {
  photo:any;
  uid: string;
  photo2:any;
  profilepic:any
  profile = {} as Profile;


  //peopleList : FirebaseListObservable<any>;


  constructor(public userservice:UserProvider, public imgservice:ImghandlerProvider, private aAuth: AngularFireAuth, private toast:ToastController, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
    //initializeApp(FIREBASE_CONFIG);
    //this.peopleList = db.list('/profiles');
    this.uid = this.aAuth.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfPage');
  }

  /*takePic(){
    this.imgservice.takePic().then((url:any)=>{
      this.profilepic = url;
    })
  }

  openGallery(){
    this.imgservice.choosefromGallery().then((url:any)=>{
      this.profilepic = url;
    })
  }*/

  async takePic(){
    try{
    const userid = this.aAuth.auth.currentUser.uid;
  	const options: CameraOptions = {
  		quality: 70,
	  	destinationType: this.camera.DestinationType.DATA_URL,
	  	encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData)=>{
    this.photo = imageData;
    this.uploadPhoto(userid);
  }); 
}
catch (e){
  console.error(e);
  }
}
/*createProfile(name, study, work, lives, fromCity){
this.peopleList.push({
  name: name,
  study: study,
  work: work,
  lives: lives,
  fromCity: fromCity,
}).then(newProfile => {
  this.navCtrl.push(ProfilePage);
}, error=>{console.log(error);});
}*/

openGallery()
{
  const userid = this.aAuth.auth.currentUser.uid;
  const options: CameraOptions =
  {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 70,
  }
  this.camera.getPicture(options).then((imageData) => 
  {
     this.photo = imageData;
     this.uploadPhoto(userid);
  }, (err) => {
  });
}

goToProfile(){
  this.aAuth.authState.take(1).subscribe(auth=>{
    this.db.object(`users/${auth.uid}/profile`).set(this.profile)
      .then(()=>{
        this.userservice.updateimage(this.profilepic).then((res:any)=>{
          if(res.success){
            this.navCtrl.setRoot(TabsPage);
          }
          else{
            alert(res);
          }
        })
      })
      this.toast.create({
      message: `Successfully updated your Profile!`,
      duration: 3000
    }).present();
}) 
}

cancel(){
  this.navCtrl.pop();
}


private uploadPhoto(uid: string): void {
  const pictures = storage().ref();
  const storageref = pictures.child(`profilePics/${uid}/img`);
   //imageData is either a base64 encoded string or a file URI
  storageref.putString(this.photo, 'base64', {contentType: 'image/jpeg'})
    .catch((err) => {
      console.log(err);
      console.log('Cant upload photo');
    }).then(()=>{storageref.getDownloadURL()
      .then((url)=>{
        this.profilepic = url;
        })
      });
}

}

/*ionViewDidLeave(){
  this.toast.create({
    message: `Successfully updated your Profile!`,
    duration: 3000
  }).present();
}*/


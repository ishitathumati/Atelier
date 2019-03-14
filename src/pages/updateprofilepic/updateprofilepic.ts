import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the UpdateprofilepicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updateprofilepic',
  templateUrl: 'updateprofilepic.html',
})
export class UpdateprofilepicPage {

  photo:any;

  constructor(private aAuth: AngularFireAuth,private toast:ToastController, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
  }

async UploadNew(){
  try{
    const userid = this.aAuth.auth.currentUser.uid;
  	const options: CameraOptions = {
  		quality: 70,
	  	destinationType: this.camera.DestinationType.DATA_URL,
	  	encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    const result = await this.camera.getPicture(options);

    const image =`data:image/jpeg;base64,${result}`;
    const pictures = storage().ref();
    pictures.child(`profilePics/${userid}/img`)
            .putString(image, 'data_url');

    this.camera.getPicture(options).then((imageData)=>{
    this.photo = imageData;
    this.uploadPhoto(userid);
  }); 
}
catch (e){
  console.error(e);
}
}

ChooseNew(){
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

private uploadPhoto(uid: string): void {
  const pictures = storage().ref();
  pictures.child(`profilePics/${uid}/img`)
   //imageData is either a base64 encoded string or a file URI
  .putString(this.photo, 'base64', {contentType: 'image/jpeg'})
    .catch((err) => {
      console.log(err);
      console.log('Cant upload photo');
    });
}

goToProfile(){
  this.navCtrl.pop();
  this.toast.create({
    message: `Your profile picture has been changed!`,
    duration: 3000
  }).present();
}

cancel(){
  this.navCtrl.pop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateprofilepicPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController, Events} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';

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
  status:any;
  profilepic:any;

  constructor(public alertCtrl: AlertController, public events: Events, public viewCtrl:ViewController, private aAuth: AngularFireAuth,private toast:ToastController, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {

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
  .then((url)=>{
    this.profilepic = url;
  })
    .catch((err) => {
      console.log(err);
      console.log('Cant upload photo');
    });

    this.status = true;
}

goToProfile(){
  //let image = this.photo;
  /*let alert = this.alertCtrl.create({
    message: 'Successfully updated profile picture!',
    buttons: ['Okay']});*/
   //this.navCtrl.push(ProfilePage, {'profilepic': this.profilepic, 'status':this.status})
  this.navCtrl.setRoot(TabsPage);
  this.toast.create({
    message: `Successfully updated profile picture!`,
    duration: 3000
  }).present();
  //alert.present();
}

cancel(){
  this.navCtrl.pop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateprofilepicPage');
  }

}

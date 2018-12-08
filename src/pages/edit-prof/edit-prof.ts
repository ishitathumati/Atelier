import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
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

  photo2:any;

  peopleList : FirebaseListObservable<any>;


  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
    //initializeApp(FIREBASE_CONFIG);
    this.peopleList = db.list('/people');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfPage');
  }
  async takePic(){
    try{
  	const options: CameraOptions = {
  		quality: 70,
	  	destinationType: this.camera.DestinationType.DATA_URL,
	  	encodingType: this.camera.EncodingType.JPEG,
  		mediaType: this.camera.MediaType.PICTURE
  }

  const result = await this.camera.getPicture(options);

  const image =`data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('pictures');
  pictures.putString(image, 'data_url');

}
catch (e){
  console.error(e);
}

	/*this.camera.getPicture(options).then((imageData) => 
	{
 //imageData is either a base64 encoded string or a file URI
 //If it's base64:
 		this.photo = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {
 //Handle error
	}); */
}

createProfile(name, study, work, lives, fromCity){
this.peopleList.push({
  name: name,
  study: study,
  work: work,
  lives: lives,
  fromCity: fromCity,
}).then(newProfile => {
  this.navCtrl.push(ProfilePage);
}, error=>{console.log(error);});
}

openGallery()
{
  const options: CameraOptions =
  {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 70,
    //saveToPhotoAlbum: false
  }

  this.camera.getPicture(options).then((imageData1) => 
  {
 //imageData is either a base64 encoded string or a file URI
 //If it's base64:
     this.photo2 = 'data:image/jpeg;base64,' + imageData1;
  }, (err) => {
 //Handle error
  });
}

goToProfile(){
  this.navCtrl.push(ProfilePage);
} 

}

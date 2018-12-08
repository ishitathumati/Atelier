import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera'
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { storage } from 'firebase';
//import { FIREBASE_CONFIG } from '../../app/firebase.config';
//import { catchError } from 'rxjs/operators';



/**
 * Generated class for the AddArtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-art',
  templateUrl: 'add-art.html',
})
export class AddArtPage {

  photo:any;
  photo2:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
    //initializeApp(FIREBASE_CONFIG);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddArtPage');
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

  this.camera.getPicture(options).then((imageData) => 
	{
 //imageData is either a base64 encoded string or a file URI
 //If it's base64:
 		this.photo = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {
 //Handle error
	}); 

}
catch (e){
  console.error(e);
}	
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

goToUpload(){
  this.navCtrl.push(UserUploadsPage);
}

}



import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera'
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { storage, initializeApp} from 'firebase';
//import { FIREBASE_CONFIG } from '../../app/firebase.config';
//import { catchError } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-add-art',
  templateUrl: 'add-art.html',
})
export class AddArtPage {

  //pictures:any;

  photo2:any;
  photo:any; 

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
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
  }

  const result = await this.camera.getPicture(options);

  const image =`data:image/jpeg;base64,${result}`;

  const pictures = storage().ref('pictures/cameraPhoto');
  pictures.putString(image, 'data_url');

  //pictures.putString(image, 'data_url');

  this.camera.getPicture(options).then((imageData) => 
	{

 		this.photo = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {

	}); 

}
catch (e){
  console.error(e);
}	
}

async openGallery()
{
  const options: CameraOptions =
  {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 70,
    //saveToPhotoAlbum: false
  }

  const result2 = await this.camera.getPicture(options);

  const image2 =`data:image/jpeg;base64,${result2}`;

  const pics = storage().ref('pictures/galleryPhoto');
  pics.putString(image2, 'data_url');

  this.camera.getPicture(options).then((imageData1) => 
  {
 
     this.photo2 = 'data:image/jpeg;base64,' + imageData1;
  }, (err) => {

  });
}

upload(){
  let image = this.photo2;
  this.navCtrl.push(UserUploadsPage, {image: image});
  let image2 = this.photo;
  this.navCtrl.push(UserUploadsPage, {image: image2});
}

}



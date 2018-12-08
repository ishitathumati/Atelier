import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddArtPage } from '../add-art/add-art';

import { Camera, CameraOptions } from '@ionic-native/camera'

import { storage, initializeApp} from 'firebase';
import { FIREBASE_CONFIG } from '../../app/firebase.config';

/**
 * Generated class for the UserUploadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-uploads',
  templateUrl: 'user-uploads.html',
})
export class UserUploadsPage {

  photo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
    initializeApp(FIREBASE_CONFIG);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserUploadsPage');
  }

  openAdd()
  {
    this.navCtrl.push(AddArtPage);
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
  
}

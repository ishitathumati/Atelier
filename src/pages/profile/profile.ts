import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
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
  
  persons: FirebaseListObservable <any>;

  personList:any;
  photo:any;
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
  
    this.persons =this.db.list('/profiles');
    this.persons.subscribe((items)=>{
       this.personList=items
    } );
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
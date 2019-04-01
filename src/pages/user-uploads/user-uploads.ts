import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AddArtPage } from '../add-art/add-art';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase';
import { Post } from '../../models/posts'
//import { url } from 'inspector';
//import { storage } from 'firebase';
import { storage, initializeApp} from 'firebase';
//import { FIREBASE_CONFIG } from '../../app/firebase.config';

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

  post = {} as Post; 

  //photo:any;
  postData: FirebaseObjectObservable <Post>;
  galleryimage: any;
  photoimage: any; 
  pics = ['flower.png', 'painting.png'];
  displayName :any;
  imageSource; 
  dbPhoto;

  

  constructor(public userservice: UserProvider, public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    //initializeApp(FIREBASE_CONFIG);
    this.galleryimage = this.navParams.get('image');
    this.photoimage = this.navParams.get('image2');

    this.imageSource = 'painting';
    this.getPhotoURL();
    this.loadName(); 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserUploadsPage');
    //this.postData = this.db.object(`posts/${data.pid}/profile`);
  }

  loadName() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
    })
    return this.displayName
  }

  openAdd()
  {
    this.navCtrl.push(AddArtPage);
  }
  
  getPhotoURL(){
    firebase.storage().ref().child('pictures/'+this.imageSource+'.png').getDownloadURL().then((url)=>{
      this.dbPhoto = url; 
    })
  }









  /*async takePic(){
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
  }*/


  
}

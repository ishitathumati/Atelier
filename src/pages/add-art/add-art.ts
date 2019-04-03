import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { storage, initializeApp} from 'firebase';
import {Post} from '../../models/post';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

//import { FIREBASE_CONFIG } from '../../app/firebase.config';
//import { catchError } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-add-art',
  templateUrl: 'add-art.html',
})
export class AddArtPage {

  //pictures:any;
  post={} as Post;
  //userid=this.aAuth.auth.currentUser.uid;
  //firedata = firebase.database().ref(`/users/${this.userid}/posts`);
  //photo2:any;
  photo:any; 

  constructor(public db: AngularFireDatabase, private aAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
    //initializeApp(FIREBASE_CONFIG);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddArtPage');
  }

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

private uploadPhoto(uid: string): void {
  const pictures = storage().ref();
  const postid = new Date().toISOString()+uid;
  this.post.postid = postid;
  //this.updatePostURL(postid);
  pictures.child(`posts/${uid}/postid`)
   //imageData is either a base64 encoded string or a file URI
  .putString(this.photo, 'base64', {contentType: 'image/jpeg'})
    .catch((err) => {
      console.log(err);
      console.log('Cant upload photo');
    });
}


cancel(){
  this.navCtrl.pop();
}

upload(){
  this.aAuth.authState.take(1).subscribe(auth=>{
  this.db.list(`users/${auth.uid}/posts`).push(this.post)
    .then(()=>this.navCtrl.pop())});
  //let image = this.photo2;
  //this.navCtrl.push(UserUploadsPage, {image: image});
  let image2 = this.photo;
  this.navCtrl.push(UserUploadsPage, {image: image2});
}

}



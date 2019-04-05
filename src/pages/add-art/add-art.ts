import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { storage, initializeApp} from 'firebase';
import {Post} from '../../models/post';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { updateDate } from 'ionic-angular/umd/util/datetime-util';

//import { FIREBASE_CONFIG } from '../../app/firebase.config';
//import { catchError } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-add-art',
  templateUrl: 'add-art.html',
})
export class AddArtPage {

  post = {} as Post; 
  firedata = firebase.database().ref('/posts'); //creates table for posts

  //pictures:any;
  //userid=this.aAuth.auth.currentUser.uid;
  //firedata = firebase.database().ref(`/users/${this.userid}/posts`);
  //photo2:any;
  photo:any; 
  postURL: any;
  rootref:any;
  postref:any;
  postkey:any;

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
      
      this.camera.getPicture(options).then((imageData)=>{
      this.photo = imageData;
      this.uploadANDgetURL(userid);
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
     this.uploadANDgetURL(userid);
  }, (err) => {
  });
}

private uploadANDgetURL(uid:string): void {
  const pictures = storage().ref();
  const name = `${new Date().getTime()}-${uid}`;
  const storageref = pictures.child(`posts/${uid}/${name}`);
   //imageData is either a base64 encoded string or a file URI
  storageref.putString(this.photo, 'base64', {contentType: 'image/jpeg'})
  .catch((err) => {
    console.log(err);
    console.log('Cant upload photo');
  }).then(()=>{
    storageref.getDownloadURL().then((url)=>{this.postURL = url})
  });
}
  
  //const postid = new Date().toISOString()+uid;
  //this.post.postid = postid;
  //this.updatePostURL(postid);


cancel(){
  this.navCtrl.pop();
}

updatePosts(){
  this.aAuth.authState.take(1).subscribe(auth=>{ 
    this.rootref = firebase.database().ref(`users/${auth.uid}`);
    this.postref = this.rootref.child('posts').push(this.post);
    this.postkey = this.postref.key;
    this.postref.update({
    postid: this.postkey,
    posturl: this.postURL
  }).then(()=>{this.navCtrl.pop()});
})
}

}


  
  //this.db.list(`users/${auth.uid}/posts`).push(this.post)
  //let image2 = this.photo;
  //this.navCtrl.push(UserUploadsPage, {image: image2});


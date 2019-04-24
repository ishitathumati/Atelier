import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { storage, initializeApp} from 'firebase';
import { Post } from '../../models/post';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-add-art',
  templateUrl: 'add-art.html',
})
export class AddArtPage {

  post = {} as Post; 
  comments = { userid: '',
              username:'',
              comment:''};
  firedata = firebase.database().ref('/posts'); //creates table for posts
  photo:any; 
  postURL: any;
  displayName :any;
  rootref:any;
  postref:any;
  postkey:any;
  commentref:any;

  constructor(public userservice:UserProvider ,public db: AngularFireDatabase, private aAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddArtPage');
  } 

  loadName() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
    })
    return this.displayName
  }

  //this function is taking a picture from the camera and uploading it to firebase 
  //using a helper function defined below uploadANDgetURL(uid:string)
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
      //getting raw image url and uploading to firebase
      this.camera.getPicture(options).then((imageData)=>{
      this.photo = imageData;
      this.uploadANDgetURL(userid);
    }); 
  }
  catch (e){
    console.error(e);
  }
}

//choosing pic from gallery
openGallery()
{
  const userid = this.aAuth.auth.currentUser.uid;
  const options: CameraOptions =
  {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 70,
  }
  //getting raw image url and uploading it to firebase
  this.camera.getPicture(options).then((imageData) => 
  {
     this.photo = imageData;
     this.uploadANDgetURL(userid);
  }, (err) => {
  });
}

//passing in userid of current user as parameter to allow that specific user to upload photo.
private uploadANDgetURL(uid:string): void {
  const pictures = storage().ref();
  const name = `${new Date().getTime()}-${uid}`;//generating name for each image uploaded
  const storageref = pictures.child(`posts/${uid}/${name}`);//storage location path in firebase storage
   //imageData is either a base64 encoded string or a file URI
  storageref.putString(this.photo, 'base64', {contentType: 'image/jpeg'})//putting image in specified location 
  .catch((err) => {
    console.log(err);
    console.log('Cant upload photo');
  }).then(()=>{
    storageref.getDownloadURL().then((url)=>{this.postURL = url})//once uploaded to firebase, getting firebase url and storing it in post table as postURL
  });
}  


cancel(){
  this.navCtrl.pop();
}

//updating post table with post id and postURL for newly uploaded image and pushing it to firebase post table.
updatePosts(){
  this.aAuth.authState.take(1).subscribe(auth=>{ 
    this.rootref = firebase.database().ref(`users/${auth.uid}`);
    this.postref = this.rootref.child('posts').push(this.post);
    this.postkey = this.postref.key;
     this.commentref = this.postref.child(`${this.postkey}`)//getting the auto generated post id of post firebase using '.key'
    //using built-in update function to store id that we got from above as postid in post table.
    this.postref.update({
    userpic: auth.photoURL,
    userid: auth.uid,
    username: auth.displayName,
    postid: this.postkey,
    posturl: this.postURL,
    comments:[{
      uid: auth.uid,
      comment: ""
    }],
    likes: ["theboss"],
  }).then(()=>{
    this.navCtrl.push(UserUploadsPage) 
  });
})
}

}



import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController, Events} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';
import {ImghandlerProvider} from '../../providers/imghandler/imghandler';
import {UserProvider} from '../../providers/user/user';

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
  posts;

  constructor(public userservice:UserProvider, public imgservice:ImghandlerProvider,public alertCtrl: AlertController, public events: Events, public viewCtrl:ViewController, private aAuth: AngularFireAuth,private toast:ToastController, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private camera:Camera) {

  }

  /*UploadNew(){
    this.imgservice.takePic().then((url:any)=>{
      this.profilepic = url;
    })
  }

  ChooseNew(){
    this.imgservice.choosefromGallery().then((url:any)=>{
      this.profilepic = url;
    })
  }*/

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
  const storageref = pictures.child(`profilePics/${uid}/img`);
   //imageData is either a base64 encoded string or a file URI
  storageref.putString(this.photo, 'base64', {contentType: 'image/jpeg'})
    .catch((err) => {
      console.log(err);
      console.log('Cant upload photo');
    }).then(()=>{storageref.getDownloadURL()
      .then((url)=>{
        this.profilepic = url;
        })
    });
}

  updateUserPicsPosts(uid: string){
    this.userservice.getpostdetails2().then((data)=>{
      if(!data){
        
      }
      else{
        this.posts=data;
        for(var i=1; i<=this.posts.length;i++){
          this.posts[i].userpic = this.profilepic
          console.log('this.posts[i].userpic', this.posts[i].userpic)
        }
      }
    }).catch((e)=>{
      console.log('updateUserPicsPosts', e)
    })
  }

  goToProfile() {
    const userid = this.aAuth.auth.currentUser.uid;
    this.userservice.updateimage(this.profilepic).then((res: any) => {
      if (res.success) {
        this.updateUserPicsPosts(userid);
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        alert(res);
      }
    }).then(()=> {this.toast.create({
      message: `Successfully updated profile picture!`,
      duration: 3000
    }).present();
  })
}

cancel(){
  this.navCtrl.pop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateprofilepicPage');
  }

}

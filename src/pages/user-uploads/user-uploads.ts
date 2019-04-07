import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AddArtPage } from '../add-art/add-art';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase';
import { Post } from '../../models/post';
import { AngularFireAuth } from 'angularfire2/auth';

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
  galleryimage: any;
  photoimage: any; 
  pics = ['flower.png', 'painting.png'];
  displayName :any;
  imageSource; 
  dbPhoto;
  allposts;
  postData: FirebaseObjectObservable<Post>;

  constructor(public zone: NgZone, public events: Events, private afAuth: AngularFireAuth, public userservice: UserProvider, public navCtrl: NavController, public navParams: NavParams) {
    //initializeApp(FIREBASE_CONFIG);
    this.galleryimage = this.navParams.get('image');
    this.photoimage = this.navParams.get('image2');

    this.imageSource = 'painting';
    this.getPhotoURL();
    this.loadName(); 
     this.userservice.getpostdetails2().then((list)=>{
      //this.allposts = Object.values(list);
      console.log('temp', list);
      this.allposts = list;
      console.log('inside new post subscribe,', this.allposts)

    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserUploadsPage');
    //this.userservice.getpostdetails2();

    //this.postData = this.db.object(`posts/${data.pid}/profile`);
  }

  ionViewDidEnter() {
    //this.userservice.getpostdetails2();
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
    this.getpostdetails().then((res:any)=>{
      this.dbPhoto = res.posturl;
      console.log(this.dbPhoto); //currently returning undefined
    }).catch((e)=>{
      
    })
    return this.dbPhoto; 
    
  }
  /*getPhotoURL(){
    try{
    const userid = this.afAuth.auth.currentUser.uid;
    firebase.storage().ref().child(`posts/${userid}/${this.post.postid}`).getDownloadURL().then((url)=>{
      this.dbPhoto = url; 
    }).catch(()=>{
      this.dbPhoto = 'https://firebasestorage.googleapis.com/v0/b/atelier-842ac.appspot.com/o/profilePics%2Fdefault.jpeg?alt=media&token=ba12bc14-ef9a-4893-947a-90b58c9850fb';
    });
  }
  catch (e){
    console.error(e);
    }
  }*/
  
 

 //need to modify this to get list info... like iterate through list of posts and get them all to display
 //need to use *ngFor in html
 getpostdetails() {
  var promise = new Promise((resolve, reject) => {
  firebase.database().ref(`/users`).child(firebase.auth().currentUser.uid).child('posts').once('value', (snapshot) => {
    resolve(snapshot.val());
  }).catch((err) => {
    reject(err);
    })
  });
  return promise;
}


/*getpostdetails2(){
  this.userservice.getPostDetailsFromDB().then((data)=>{
    this.postlist
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

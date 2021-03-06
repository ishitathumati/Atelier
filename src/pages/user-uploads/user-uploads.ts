import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AddArtPage } from '../add-art/add-art';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { Post } from '../../models/post';
import { AngularFireAuth } from 'angularfire2/auth';
import { PostPage } from '../post/post';



//import { url } from 'inspector';
//import { storage } from 'firebase';
import { storage, initializeApp} from 'firebase';
import { HomePage } from '../home/home';
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
  rootref:any;
  postref:any;
  postkey:any;
  //postid:any;
  commentref:any;
  postURL:any;
  changed = false;

  constructor(public zone: NgZone, public events: Events, private afAuth: AngularFireAuth, 
    public userservice: UserProvider, public navCtrl: NavController, public navParams: NavParams
  ,private fdb: AngularFireDatabase,  private toast: ToastController) {
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
    this.getPhotoURL();
    this.loadName(); 
     this.userservice.getpostdetails2().then((list)=>{
      //this.allposts = Object.values(list);
      console.log('temp', list);
      this.allposts = list;
      console.log('allposts', this.allposts)
    });

  }

  ionViewDidEnter() {
    
    this.getPhotoURL();
    this.loadName(); 
     this.userservice.getpostdetails2().then((list)=>{
      console.log('temp', list);
      this.allposts = list;
      console.log('allposts', this.allposts)

    });

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

deletePost(postid){
  this.afAuth.authState.take(1).subscribe(auth=>{ 
    this.rootref = firebase.database().ref(`users/${auth.uid}`);
    let postref = this.rootref.child('posts/' + postid);
    postref.remove().then((data) => {
      this.allposts[postid] = [];
      this.allposts[postid] = data;
    })
    this.toast.create({
      message: `Post deleted!`,
      duration: 2000
    }).present();
    this.navCtrl.setRoot(UserUploadsPage);
})
}

/*goToEditPost(item){
  var data1 = {post: item};
  data1["test"] = "test";
  this.navCtrl.push(EditArtPage, data1);
  if(item.postid){
    console.log('this is the post id' + item.postid, item.title, item.price);
  }
}*/

goToPost(item){
  this.navCtrl.push(PostPage,{post:item}); //pushing post to userupload page as well as navigating to the page
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
  
}

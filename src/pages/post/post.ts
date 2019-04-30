import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Post } from '../../models/post';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserUploadsPage } from '../user-uploads/user-uploads';


/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post = {} as Post; 
  posts : any [];
  specificpost;
  postref:any;
  rootref:any;
  postkey:any;
  changed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private aAuth: AngularFireAuth,
    private toast: ToastController, public db: AngularFireDatabase) {
    this.specificpost = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }


  goToEditPost(item){
    this.navCtrl.push(EditArtPage,{specificpost:item});
  }

  editPost(postid){
    this.aAuth.authState.take(1).subscribe(auth=>{
      this.rootref = firebase.database().ref(`users/${auth.uid}`);
      let postref = this.rootref.child('posts/' + postid);
      this.changed = true;
      postref.update(this.specificpost);
      this.navCtrl.setRoot(UserUploadsPage);
      this.toast.create({
      message: `Successfully updated your post!`,
      duration: 2000
      }).present(); 
  }) 
  }

}

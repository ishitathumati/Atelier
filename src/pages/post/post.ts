import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Post } from '../../models/post';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditArtPage } from '../edit-art/edit-art';


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
      // console.log('this is the post price' + this.post.price,'this is the post title' + this.post.title, 'this is the post description' + this.post.description);
    
      // console.log('username'+this.post.username);
      console.log('this is the post test xx' + postid);
      console.log('this.post inspec' + this.specificpost.title);


      postref.update(this.specificpost);









     /*postref.update(this.post).then(()=>{
          if(this.changed){
            console.log('post changed');
            console.log('this is the post' + this.post);


            /*this.userservice.updateimage(this.allposts.posturl).then((res:any)=>{
              if(res.success){
                this.navCtrl.setRoot(UserUploadsPage);
                console.log('post data changed');
              }
              else{
                alert(res);
              }
            }
          
          
          )
          }
          else{
            this.navCtrl.setRoot(UserUploadsPage);
            console.log('data wasnt changed');
          }
        })*/
        this.toast.create({
        message: `Successfully updated your post!`,
        duration: 2000
      }).present(); 
  }) 
  }

}

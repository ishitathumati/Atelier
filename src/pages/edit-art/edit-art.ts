import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Post } from '../../models/post';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import firebase from 'firebase';

/**
 * Generated class for the EditArtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-art',
  templateUrl: 'edit-art.html',
})
export class EditArtPage {

  post = {} as Post; 
  changed=false;
  posturl:any;
  allposts; 
  rootref:any;
  postref:any;
  postkey:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private aAuth: AngularFireAuth,
  private toast: ToastController, public db: AngularFireDatabase, public userservice:UserProvider) {
    this.userservice.getpostdetails2().then((list)=>{
      //this.allposts = Object.values(list);
      console.log('temp', list);
      this.allposts = list;
      console.log('inside new post subscribe,', this.allposts)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditArtPage');
    this.userservice.getpostdetails2().then((list)=>{
      console.log('temp', list);
      this.allposts = list;
      console.log('allposts', this.allposts)
    });
  }

  editPost(postid){
    this.aAuth.authState.take(1).subscribe(auth=>{
      this.rootref = firebase.database().ref(`users/${auth.uid}`);
      let postref = this.rootref.child('posts/' + postid);
      this.changed = true;
      // console.log('this is the post price' + this.post.price,'this is the post title' + this.post.title, 'this is the post description' + this.post.description);
    
      // console.log('username'+this.post.username);
      console.log('this is the post test' + postid);



      // postref.update(this.post);









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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Post } from '../../models/post';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { UserUploadsPage } from '../user-uploads/user-uploads';

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
  changed = false;
  allposts; 

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

  editPost(){
    this.aAuth.authState.take(1).subscribe(auth=>{
      this.db.object(`users/${auth.uid}/posts`).update(this.post)
        .then(()=>{
          if(this.changed){
            this.userservice.updateimage(this.allposts.posturl).then((res:any)=>{
              if(res.success){
                this.navCtrl.setRoot(UserUploadsPage);
              }
              else{
                alert(res);
              }
            })
          }
          else{
            this.navCtrl.setRoot(UserUploadsPage);
          }
        })
        this.toast.create({
        message: `Successfully updated your post!`,
        duration: 2000
      }).present(); 
  }) 
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Post } from '../../models/post';
import firebase from 'firebase';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private aAuth: AngularFireAuth) {
    this.specificpost = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }


  goToEditPost(item){
    this.navCtrl.push(EditArtPage,{specificpost:item});
  }

}

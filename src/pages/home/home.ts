import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular'; 
import { ProfilePage } from '../profile/profile';
import { CommentsPage } from '../comments/comments';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'; 
import {NotificationProvider} from '../../providers/notification/notification';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  
  likes: object[] = [];
  username: string = 'sahil\'sLike';
  s;
  allposts;
  postReference;
  fireref;

  constructor(public toast:ToastController, public notification:NotificationProvider, public userservice:UserProvider, private afAuth: AngularFireAuth, public navCtrl: NavController, public db: AngularFireDatabase) {

      this.userservice.getpostdetails2().then((list)=>{
        this.allposts =list;
        console.log('list of posts', this.allposts)
      });
    
  }
  
//put this in the img src for profic pic avatar
  // <img  src="{{allposts[i].userpic}}" 

  liked(i){
    console.log(this.allposts[i].likes)
    if(this.allposts[i].likes==null)
                this.allposts[i].likes='0'
    this.allposts[i].likes=(Number(this.allposts[i].likes)+1).toString()
    console.log(this.allposts[i].likes)
   this.updatelikes(this.allposts[i]).then(()=>{
     console.log('like updated');
   })


}

updatelikes(postdetails){
  var promise = new Promise((resolve, reject)=>{
    this.fireref = firebase.database().ref(`users/${postdetails.userid}`); 
    let likeref = this.fireref.child(`posts/${postdetails.postid}`)
      likeref.update({
      likes: postdetails.likes
    })
    console.log('status', true)
  })
  return promise
}

  btnclicked(){
    this.navCtrl.push(CommentsPage);
  }

  ProfilePageClick(){
    this.navCtrl.push(ProfilePage);
  }

  ionViewDidLoad(){
    this.notification.getToken()

    this.notification.listentoNotifs().pipe(
      tap(msg => {
        const x = this.toast.create({
          message: msg.body,
          duration: 3000
        });
        x.present();
      })
    ).subscribe()
    
    this.userservice.getpostdetails2().then((list)=>{
      this.allposts =list;
      console.log('list of posts', this.allposts)
    });
  }

  ionViewDidEnter(){
    this.userservice.getpostdetails2().then((list)=>{
      this.allposts =list;
      console.log('list of posts', this.allposts)
    });
  }
  

  }
import { Component, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular'; 
import { ProfilePage } from '../profile/profile';
import { CommentsPage } from '../comments/comments';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { OtherProfilePage } from '../other-profile/other-profile';


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
  seeComments: boolean[];
  newComment: string[];
  constructor(public zone: NgZone, public alertCtrl: AlertController, public userservice:UserProvider, private afAuth: AngularFireAuth, public navCtrl: NavController, public db: AngularFireDatabase) {
      this.seeComments = [];
      this.newComment = [];
      this.allposts = [];
      this.userservice.getpostdetails3(firebase.auth().currentUser.uid).then((list)=>{
        this.allposts =list;
        console.log(this.allposts)
      });
      for(var i = 0; i<this.allposts.length; i++) {
        this.seeComments.push(false);
        this.newComment.push("");
      }
      // console.log(this.isLiked);
      // console.log(this.newComment);
      // console.log(this.seeComments);
  }
  
//put this in the img src for profic pic avatar
  // <img  src="{{allposts[i].userpic}}" 

  liked(i){
    // console.log(this.allposts[i].likes)
    if(this.allposts[i].likes==null)
                this.allposts[i].likes=[];
    this.allposts[i].likes.push(firebase.auth().currentUser.uid);
    // console.log(this.allposts[i].likes)
   this.updatelikes(this.allposts[i]).then(()=>{
    //  console.log('like updated');
   })
}

isLiked(i) {
    var likedUsers = this.allposts[i].likes;
    //console.log('likedusers', likedUsers)
    var ret = false;
      for(var j=0; j<likedUsers.length; j++) {
        if(likedUsers[j] == firebase.auth().currentUser.uid) {
          ret = true;
        }
  }
  return ret;
}


gotoOther(post){
  this.navCtrl.push(OtherProfilePage, {userid: post.userid, username:post.username, userpic:post.userpic})
}

unlike(i) {
  var ind = this.allposts[i].likes.indexOf(firebase.auth().currentUser.uid);
  this.allposts[i].likes.splice(ind, 1);
  this.updatelikes(this.allposts[i]).then(()=>{
    //  console.log('like updated');
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

  btnclicked(ind){
    this.seeComments[ind] = true;
    //this.navCtrl.push(CommentsPage, {postinfo: postdetails});
  }


  // ionViewDidLoad(){
  //   this.allposts = [];
  //   this.userservice.getpostdetails3(firebase.auth().currentUser.uid).then((list)=>{
  //     this.allposts =list;
  //     // console.log('list of posts', this.allposts)
  //   });

  // }

  doRefresh(event){
    this.userservice.getpostdetails3(firebase.auth().currentUser.uid).then((data)=>{

      this.allposts=[];
      this.allposts=data;
      console.log('list of posts', this.allposts);
      setTimeout(() => {
        console.log('Async operation has ended');
        event.complete();
      }, 400);
    }); 
  }

  getUserDetails(uid) {
    var ret = "";
    firebase.database().ref('users/'+uid).on('value', function(snap) {
      ret = snap.val().displayName;
    });
    // console.log('list of posts', this.allposts);
    return ret;
  }

  sendComment(i) {
    var temp = {
      uid: firebase.auth().currentUser.uid,
      comment: this.newComment[i]
    }
    // console.log('list of posts', this.allposts);
    this.db.list('users/'+this.allposts[i].userid+'/posts/'+this.allposts[i].postid+'/comments').push(temp);
    this.newComment[i] = "";
  }

  getComments(i) {
    var comm: any [];
    comm = [];
    // console.log('list of posts', this.allposts);
    firebase.database().ref('users/'+this.allposts[i].userid+'/posts/'+this.allposts[i].postid+'/comments').on('value', (snap) => {
      snap.forEach((snapshot) => {
        firebase.database().ref('users/'+this.allposts[i].userid+'/posts/'+this.allposts[i].postid+'/comments/'+snapshot.key).on('value', (comment) => {
          comm.push(comment.val());
        });
        return false;
      });
    });
    return comm;
  }
  }
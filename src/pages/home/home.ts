import { Component, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular'; 
import { ProfilePage } from '../profile/profile';
import { CommentsPage } from '../comments/comments';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'; 


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
  isLiked: boolean[];
  seeComments: boolean[];
  newComment: string[];
  constructor(public zone: NgZone, public alertCtrl: AlertController, public userservice:UserProvider, private afAuth: AngularFireAuth, public navCtrl: NavController, public db: AngularFireDatabase) {
      this.seeComments = [];
      this.newComment = [];
      this.allposts = [];
      this.isLiked = [];
      this.userservice.getpostdetails3(firebase.auth().currentUser.uid).then((list)=>{
        this.allposts =list;
        // console.log(this.allposts)
      });
      for(var i = 0; i<this.allposts; i++) {
        this.seeComments.push(false);
        this.newComment.push("");
        this.isLiked.push(false);
      }
      for(var i=0; i<this.allposts; i++) {
        for(var j=0; j<this.allposts[i].likes; j++) {
          if(this.allposts[i].likes[j] == firebase.auth().currentUser.uid) {
            this.isLiked[i] = true;
          }
        }
      }
      console.log(this.isLiked);
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

/*addcomment(i){
  let statusalert = this.alertCtrl.create({
    buttons: ['okay']
  });
  let alert = this.alertCtrl.create({
    title: 'Add Comment',
    inputs: [{
      name: 'name',
      placeholder: 'comment'
    }],
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      handler: data => {

      }
    },
    {
      text: 'send',
      handler: data => {
        if (data.name) {
          this.addCommenttodb(data.name, this.allposts[i]).then((res: any) => {
            if (res.success) 
            {
              console.log('status', res.success)
              statusalert.setTitle('comment added!');
              statusalert.present();
              this.zone.run(() => {
                this.displayName = data.name;
              })
            }
            else {
              statusalert.setTitle('Failed');
              statusalert.setSubTitle('Your name was not changed');
              statusalert.present();
            }
                           
          })
        }
      }
      
    }]
  });
  alert.present();
}

addCommenttodb(comment, x){
  var promise = new Promise((resolve, reject)=>{
  this.db.list(`/users/${x.userid}/posts/${x.postid}/comments`).push({
    comment: comment,
    userid: this.afAuth.auth.currentUser.uid,
    username: this.afAuth.auth.currentUser.displayName
  })
  resolve({success: true})
})
return promise;
}
*/

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

  ProfilePageClick(){
    this.navCtrl.push(ProfilePage);
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
        // console.log('Async operation has ended');
        event.complete();
      }, 400);
    });

  }

   
  // ionViewDidEnter(){
  //   this.allposts=[];
  //   this.userservice.getpostdetails3(firebase.auth().currentUser.uid).then((list)=>{
  //     this.allposts =list;
  //     // console.log('list of posts', this.allposts)
  //   });
  // }
  getUserDetails(uid) {
    var ret = "";
    firebase.database().ref('users/'+uid).on('value', function(snap) {
      ret = snap.val().displayName;
    });
    // console.log('list of posts', this.allposts);
    return ret;
  }
  sendComment(i) {
    // console.log('list of posts', this.allposts);
    // console.log(this.allposts[i].comments[0]);
    // console.log(this.newComment);
    var temp = {
      uid: firebase.auth().currentUser.uid,
      comment: this.newComment[i]
    }
    // console.log('list of posts', this.allposts);
    this.db.list('users/'+this.allposts[i].userid+'/posts/'+this.allposts[i].postid+'/comments').push(temp);
    this.newComment[i] = "";
    // console.log('list of posts', this.allposts);
    // console.log(this.newComment);
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
    // comm = this.allposts[i].comments;
    // console.log(comm);
    // console.log(this.allposts[i].comments);
    // console.log('list of posts', this.allposts);
    return comm;
  }
  }
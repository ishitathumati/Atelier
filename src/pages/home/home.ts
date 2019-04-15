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
  seeComments: boolean[];
  newComment: string;
  constructor(public zone: NgZone, public alertCtrl: AlertController, public userservice:UserProvider, private afAuth: AngularFireAuth, public navCtrl: NavController, public db: AngularFireDatabase) {
      this.seeComments = [];
      this.newComment = "";
      this.userservice.getpostdetails2().then((list)=>{
        this.allposts =list;
        console.log(this.allposts)
      });
      for(var i = 0; i<this.allposts; i++) {
        this.seeComments.push(false);
      }
      console.log(this.newComment);
      console.log(this.seeComments);
  }
  
//put this in the img src for profic pic avatar
  // <img  src="{{allposts[i].userpic}}" 

  liked(i){
    // console.log(this.allposts[i].likes)
    if(this.allposts[i].likes==null)
                this.allposts[i].likes='0'
    this.allposts[i].likes=(Number(this.allposts[i].likes)+1).toString()
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

  ionViewDidLoad(){
    this.userservice.getpostdetails2().then((list)=>{
      this.allposts =list;
      // console.log('list of posts', this.allposts)
    });

  }

  doRefresh(event){
    this.userservice.getpostdetails2().then((data)=>{

      this.allposts=[]
      this.allposts=data

      setTimeout(() => {
        // console.log('Async operation has ended');
        event.complete();
      }, 400);
    });

  }

   
  ionViewDidEnter(){
    this.userservice.getpostdetails2().then((list)=>{
      this.allposts =list;
      // console.log('list of posts', this.allposts)
    });
  }
  getUserDetails(uid) {
    var ret = "";
    firebase.database().ref('users/'+uid).on('value', function(snap) {
      ret = snap.val().displayName;
    });
    return ret;
  }
  sendComment(i) {
    var temp = {
      uid: firebase.auth().currentUser.uid,
      comment: this.newComment
    }
    firebase.database().ref('users/'+this.allposts[i].uid+'/posts'+this.allposts[i].postid+'/comments').push(temp);
    this.newComment = "";
  }
  }
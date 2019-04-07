import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'; 
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

  firedata = firebase.database().ref(`/users`);

  constructor(public userservice:UserProvider, private afAuth: AngularFireAuth, public navCtrl: NavController, public db: AngularFireDatabase) {

    this.s = this.db.list(`users/${this.afAuth.auth.currentUser.uid}/posts/`).subscribe( data => {
      this.likes = data;

      this.userservice.getpostdetails2().then((list)=>{
        this.allposts =list;
        console.log('list of posts', this.allposts)
      });

    });
    
  }
  
//put this in the img src for profic pic avatar
  // <img  src="{{allposts[i].userpic}}" 

  // // ngOnInit(){

  // //   this.postReference = this.afs.doc(`posts/${this.allposts}`).valuechanges()
  // //   .subsucribe(val: any => {
  // //     this.post = Val
  // //     this.heartype = val.likes
  // //   })



  // }
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
    //currently showing undefined on firebase because userid attribute just added
    //so old users on db dont have that on them. otherwise function works!!
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


  handleLike(){
    this.db.list('/like').push({
      username: this.username
    }).then(() => {

      //comment is sent

    }).catch(() => {

      //firebase is unreachable

    })
  }

 
/*export class likes{
  likeValue: number;
  dislikeValue: number;

    constructor(){
      this.likeValue = 0;
      this.dislikeValue = 0;
    }

    handleLike(){
      this.likeValue++;
    }
    handleDislike(){
      this.dislikeValue++;
    }*/

   

  }
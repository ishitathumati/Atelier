import { Component, Input } from '@angular/core';
//import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { storage } from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { User } from '../../models/users';
import { HomePage } from '../home/home';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import * as firebase from 'firebase';
import { RequestsProvider } from '../../providers/requests/requests';
import { UserProvider } from '../../providers/user/user';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { a } from '@angular/core/src/render3';
import {initializeApp} from 'firebase';
import { connreq } from '../../models/request';
import { ProfilePage } from '../profile/profile';
import { Post } from '../../models/post';
import { AngularFireAuth } from 'angularfire2/auth';
import { all } from 'q';
//import { OtherProfilePage } from '../other-profile/other-profile';
import { PhotoPage } from '../photo/photo';
import { OtheruserprofilePage } from '../otheruserprofile/otheruserprofile';



/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})

export class ExplorePage {

  top = 0;
  bottom = 5;
  search: boolean;
  rootref:any;
  hashref:any;
  haskey:any;

  imageSource1; 
  imageSource2;
  imageSource3;
  imageSource4;

  dbPhoto1;
  dbPhoto2;
  dbPhoto3;
  dbPhoto4;
  posts : any [];
  newrequest = {} as connreq;
  allHashtags = []; //array of hashtags
  hashtag; //input
  temparr = [];
  filteredusers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController, public requestservice: RequestsProvider,private aAuth: AngularFireAuth, private fdb: AngularFireDatabase) {
      this.posts = [];
      this.search == false;
      this.imageSource1 = 'bluemount';
      this.imageSource2 = 'dusk';
      this.imageSource3 = 'scream';
      this.imageSource4 = 'starrynight';

      this.getPhotoURL().then((data)=>{

        this.posts=this.shuffle(data);

        this.userservice.getallusers().then((res: any) => {
          this.filteredusers = res;
          this.temparr = res;
          
  
        this.fdb.list("/hashtags").subscribe(_data=>{
          this.allHashtags = _data;
  
          console.log(this.allHashtags);
        })
  
    });
  })
}



  searchuser(searchbar) {
    this.search = true;
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName && typeof v.displayName === "string" && v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
    if(q == '') {
      this.search = false;
    }
  }

  

 
  doRefresh(event){
    this.getPhotoURL().then((data)=>{
      this.posts=this.shuffle(data);
      console.log('list of posts');
      setTimeout(() => {
        console.log('Async operation has ended');
        event.complete();
      }, 400);
    }); 
  }
 


  
  /* doRefresh(event) {

    this.userservice.getPhotoURL (firebase.auth().currentUser.uid).then((data)=>{

    this.posts = [];
    this.posts = data;
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 2000);
  });
} 
 */





 //opens up the specific post
 goToPhotos(item)
 {
   this.navCtrl.push(PhotoPage,{post:item});
 }

 //opens up user profile from explore page grid
gotoOther(post){
  this.navCtrl.push(OtheruserprofilePage, {userid: post.userid, username:post.username, userpic:post.userpic});
}

//opens up user profile from the search bar
gotoOther2(userProf)
{
  this.navCtrl.push(OtheruserprofilePage, {userid: userProf.uid, username: userProf.displayName, userpic: userProf.photoURL});
} 
 




 /* goToPhotos(item)
{
  this.navCtrl.push(PhotoPage,{post:item});
} */

//opens up user profile from explore page grid
/* gotoOther(post){
 this.navCtrl.push(ShaluPage, {userid: post.userid, username:post.username, userpic:post.userpic});
}

//opens up user profile from the search bar
gotoOther2(userProf)
{
 this.navCtrl.push(ShaluPage, {userid: userProf.uid, username: userProf.displayName, userpic: userProf.photoURL});
}  */




  getPhotoURL()
  {
    var self = this;
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref(`/users`)  .on('value', (snapshot) => {
        snapshot.forEach(function(userStuff) {
          var key = userStuff.key;
          firebase.database().ref('/users/'+key+'/posts').on('value', function(shot) {
            shot.forEach(function(shotChild) {
              
              var keypost = shotChild.key;
              firebase.database().ref('/users/'+key+'/posts/'+keypost).on('value', function(thePost) {
                var s = thePost.val();
                console.log(s);
                var temp = {
                  'username': s.username,
                  'userid' : s.userid,
                  'userpic':s.userpic,
                  'postid' : s.postid,
                  'price' : s.price,
                  'title' : s.title,
                  'description' : s.description,
                  'posturl' : s.posturl,
                  'hashtag' : s.hashtag,
                  'likes': s.likes,
                  'comments': s.comments
                } as Post;
                if(temp.userid != null && temp.username != null && temp.postid != null && temp.price != null && 
                  temp.title != null && temp.description != null && temp.posturl != null)
                  {
                    console.log(temp);
                    self.posts.push(temp);
                    
                  }
                 
               
              });
              return false;
            });

          });
          return false;
        });

        resolve(this.posts)
      });
    });
    return promise;
  }

   shuffle(arra1) {
     console.log('shufflr csalled')
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}





  

  


  /* hashtagExists() {
    firebase.database().ref('hashtags').on('value', function(snapshot) {
      snapshot.forEach(function(snap) {
        this.allHashtags.push(snap.val()); //push the hashtag
        return false;
      });
    });
     //check if the hashtag entered is in the array of hashtags
    var doesExist: boolean = false;
    for(var i:number = 0; i<this.allHashtags.length; i++) {
      if(this.allHashtags[i] == this.hashtag) {
        doesExist = true;
      }
    }
    //if hashtag doesn't exist, push to the table of hashtags in firebase
    if(!doesExist) {
      this.fdb.list("/hashtags").push(this.hashtag);
      /*this.aAuth.authState.take(1).subscribe(auth=>{
      this.rootref = firebase.database().ref('hashtags').push(this.allHashtags);
      })*/
   
 
 /* hashtagSearch(){
    var doesExist: boolean = false;
    for(var i:number = 0; i<this.allHashtags.length; i++) {
      if(this.allHashtags[i] == this.hashtag) {
        doesExist = true;
      }
    }
    if(!doesExist){
      this.fdb.list("/hashtags").push(this.hashtag);
    }
  }*/

}








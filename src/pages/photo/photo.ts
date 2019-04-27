import { Component, Input } from '@angular/core';
import { storage } from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';
import { RequestsProvider } from '../../providers/requests/requests';
import { UserProvider } from '../../providers/user/user';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { a } from '@angular/core/src/render3';
import { connreq } from '../../models/request';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the PhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  
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

  specificpost;
  specificprofile;

  username;
  user;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController, public requestservice: RequestsProvider,private aAuth: AngularFireAuth, private fdb: AngularFireDatabase) {
      this.posts = [];
      this.search == false;
      this.imageSource1 = 'bluemount';
      this.imageSource2 = 'dusk';
      this.imageSource3 = 'scream';
      this.imageSource4 = 'starrynight';


      //this.userId = firebase.auth(). currentUser.uid;
      
      
      this.specificpost = this.navParams.get('post')

      this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;

      this.fdb.list("/hashtags").subscribe(_data=>{
        this.allHashtags = _data;

        console.log(this.allHashtags);
      })

  })
  }
  

  getTotalLike()
  {

  }


  getTotalComments()
  {
    
  }


  /* sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You cannot send a request to yourself!');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request was sent!',
        subTitle: 'Request sent to ' + recipient.displayName,
        buttons: ['OK']
      });
    
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }

 */





  sendreq() {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = this.user;
    if (this.newrequest.sender == this.newrequest.recipient)
      alert('You cannot send a request to yourself!');
    else{
      let successalert = this.alertCtrl.create({
        title: 'Request was sent!',
        subTitle: 'Request sent to ' + this.username,
        buttons: ['OK']
      });
    
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }
  
  ionViewWillEnter(){
  }
  
  ionViewDidEnter(){
  }
  
  }
  
  



  

  




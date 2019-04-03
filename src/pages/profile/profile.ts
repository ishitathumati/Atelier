import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { UpdateprofilepicPage } from '../updateprofilepic/updateprofilepic';
import { PopoverComponent } from '../../components/popover/popover';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage { 
  
  profile = {} as Profile;
  persons: FirebaseListObservable <any>;

  profileData: FirebaseObjectObservable <Profile>;
  item:any;
  personList:any;
  name: string;
  name1: any;
  //loadImage:any;
  imagesource: any;
  profilepic: any;
  displayName: any;
  firedata = firebase.database().ref(`/users`);

  constructor(private afAuth: AngularFireAuth, public zone: NgZone, public alertCtrl: AlertController, public db: AngularFireDatabase, public userservice: UserProvider, public navCtrl: NavController, private toast: ToastController, public navParams: NavParams, private camera:Camera, public popoverCtrl: PopoverController) {
    //this.loadImage = this.navParams.get('image');
    //this.imagesource = 'profilePic'
   /* this.persons =this.db.list('/profiles');
    this.persons.subscribe((items)=>{
       this.personList=items
    } );*/
    this.getProfilePicture();
    this.loadName();    
  }

  loadName() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
    })
    return this.displayName
  }

  /*loadprofiledetails(){
    this.userservice.getprofiledetails().then((res: any)=>{
      this.name = res.name;
    })
    return this.name
  }*/

  getItem(key: string): FirebaseObjectObservable<Profile> {
    this.item = this.db.object(`users/${this.afAuth.auth.currentUser.uid}/profile/${key}`)
    return this.item
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Display Name',
      inputs: [{
        name: 'name',
        placeholder: 'Your Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
 
        }
      },
      {
        text: 'Edit',
        handler: data => {
          if (data.name) {
            this.userservice.updatedisplayname(data.name).then((res: any) => {
              if (res.success) 
              {
                console.log('status', res.success)
                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your name has been changed successfully!');
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
  
  /*setName(){
    //let userid = this.afAuth.auth.currentUser.uid;
    //firedata = this.firebase.database().ref(`users/${userid}/details/displayName`);
    if(this.name)
    {
      this.name1 = this.loadprofiledetails;
      console.log('name', this.name1)
    }
    else
    {
      this.name1 = this.loaduserdetails();
      console.log('name', this.name1)
    }
  }*/

  getProfilePicture(){
  try{
    let userid = this.afAuth.auth.currentUser.uid;
    this.imagesource = storage().ref().child(`profilePics/${userid}/img`);
    
      storage().ref().child(`profilePics/${userid}/img`).getDownloadURL()
      .then((url)=>{
        console.log('profile pic url', url);
        this.profilepic = url
        /*}).then((profilepic)=>{
          this.db.object(`profile/${userid}/`).update({photo: profilepic})*/
    }).catch(()=>{
      this.profilepic = 'https://firebasestorage.googleapis.com/v0/b/atelier-842ac.appspot.com/o/profilePics%2Fdefault.jpeg?alt=media&token=ba12bc14-ef9a-4893-947a-90b58c9850fb';
    });
  }
  catch (e){
    console.error(e);
    }
  }

presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(PopoverComponent);
  popover.present({
    ev: myEvent
  });
}

  ionViewDidLoad() {
    this.loadName();
    console.log('ionViewDidLoad ProfilePage');
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to Atelier, ${data.email}`,
          duration: 3000
        }).present();
      this.profileData = this.db.object(`users/${data.uid}/profile`)
  }
      else{
        this.toast.create({
          message: `Authentication details missing`,
          duration: 3000
        }).present();
      }
  })
}
}
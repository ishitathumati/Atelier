import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';
import { UpdateprofilepicPage } from '../../pages/updateprofilepic/updateprofilepic';
import { AngularFireAuth } from 'angularfire2/auth';
import { storage } from 'firebase';
import { ProfilePage } from '../../pages/profile/profile';
import { TabsPage } from '../../pages/tabs/tabs';
import {UserProvider} from '../../providers/user/user';



/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  imagesource: any;
  profilepic:any;
  status:any;
  posts;
  defaultpic = 'https://firebasestorage.googleapis.com/v0/b/atelier-842ac.appspot.com/o/profilePics%2Fdefault.jpeg?alt=media&token=ba12bc14-ef9a-4893-947a-90b58c9850fb';

  constructor(public userservice: UserProvider, public navParams:NavParams, public viewCtrl: ViewController, public navCtrl: NavController, public alertCtrl: AlertController, public afAuth: AngularFireAuth, public toast:ToastController) {
    console.log('PopoverComponent did load');
  }

  UpdateProfilePic(){
    this.navCtrl.push(UpdateprofilepicPage);
    this.viewCtrl.dismiss();
  }

  RemoveProfilePic(){
  let alert = this.alertCtrl.create({
    title: 'Remove Picture',
    message: 'Are you sure you want to delete it?',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      }
    },
    {
      text: 'Delete',
      handler: () => {
        let userid = this.afAuth.auth.currentUser.uid
        let pictureRef = storage().ref().child('profilePics').child(`${userid}/img`)
            pictureRef.delete().then(()=>{
              this.userservice.updateimage(this.defaultpic);
              this.updateUserPicsPosts(userid);
              this.status = true;
            }).then(()=>{
                if(this.status){
                  this.toast.create({
                    message: `Profile picture removed!`,
                    duration: 3000
                  }).present();
                }
                this.navCtrl.setRoot(TabsPage);
                console.log('image deleted!')// File deleted successfully
              }).catch((e)=>{
              console.error(e);
              console.log('Cannot delete because nothing has been uploaded')
            });  
          }
                           
      }]
  });
  alert.present();
  this.viewCtrl.dismiss();
}

updateUserPicsPosts(uid: string){
  this.userservice.getpostdetails2().then((data)=>{
    if(!data){
      
    }
    else{
      this.posts=data;
      for(var i=1; i<=this.posts.length;i++){
        this.posts[i].userpic = this.defaultpic;
        console.log('this.posts[i].userpic', this.posts[i].userpic)
      }
    }
  }).catch((e)=>{
    console.log('updateUserPicsPosts', e)
  })
}

}

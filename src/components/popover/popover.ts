import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { UpdateprofilepicPage } from '../../pages/updateprofilepic/updateprofilepic';
import { AngularFireAuth } from 'angularfire2/auth';
import { storage } from 'firebase';



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

  text: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public alertCtrl: AlertController, public afAuth: AngularFireAuth) {
    console.log('PopoverComponent did load');
    this.text = 'Hello World';
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

}

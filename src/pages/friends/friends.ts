import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreq } from '../../models/request';
import firebase from 'firebase';

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController, public requestservice: RequestsProvider) {
      this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
        console.log('users', this.filteredusers);
        this.temparr = res;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage'); 
  }
  
  searchuser(searchbar) {
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
  }


  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender == this.newrequest.recipient)
      alert('You cannot send a request to yourself!');
    else{
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

}

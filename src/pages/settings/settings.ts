import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
//settingsId = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.settingsId = this.navParams.get('settingsId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

}

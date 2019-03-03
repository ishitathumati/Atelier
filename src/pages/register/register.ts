import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private aAuth: AngularFireAuth) {
  }


  async register(user: User)
  {
    try
    {
      const result = await this.aAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result)
      {
        this.toast.create({
          message: `Successfully registered! Please log in`,
          duration: 3000
        }).present();
        this.navCtrl.push(LoginPage);
      }
    }
    catch(e){
      console.error(e);
    }
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad RegisterPage');
        this.toast.create({
          message: `Welcome to Atelier!`,
          duration: 3000
        }).present();
  }

}
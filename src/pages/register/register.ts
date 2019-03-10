import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

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

  newuser = {
    email: '',
    password: '',
    displayName: '',
    photoURL: ''
  }
  

  constructor(private toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private aAuth: AngularFireAuth, public userservice: UserProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  async register(user: User) {
    try
    {
      this.userservice.adduser(this.newuser).then((res: any) => {
        if (res.success)
        {
        this.toast.create({
          message: `Successfully registered! Please log in`,
          duration: 3000
        }).present();
        this.navCtrl.push(LoginPage);
        }
      })
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
      /*const result = await this.aAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result)
      {
        this.toast.create({
          message: `Successfully registered! Please log in`,
          duration: 3000
        }).present();
        this.navCtrl.push(LoginPage);
      }*/
    

  
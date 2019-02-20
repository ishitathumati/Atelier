import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
//import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private aAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*async navTabs(){
    //you can use either of below
    this.route.navigateByUrl('/app/tabs/(home:home)');
    //this.navCtrl.navigateRoot('/app/tabs/(home:home)')
}*/

  async login(user: User){
    try{
      const result = this.aAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result)
      {
        this.navCtrl.push(TabsPage);
      }
    }
    catch(e){
      console.error(e);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}

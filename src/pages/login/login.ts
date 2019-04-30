/**
 * Some of the code in this page is modeled after that found in https://tphangout.com/chat-app-with-ionic-3-and-firebase-ep-1-sign-in-tabs/
 * Author of code found in above link: Raja Yogan
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';
//import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { CommentsPage } from '../comments/comments';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public db:AngularFireDatabase, public toast:ToastController,private aAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*async navTabs(){
    //you can use either of below
    this.route.navigateByUrl('/app/tabs/(home:home)');
    //this.navCtrl.navigateRoot('/app/tabs/(home:home)')
}*/
/**
  signin() {
    this.authservice.login(this.user).then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot('TabsPage');
      else 
        alert(res);
    }) 
  }
*/

  /*async login(user: User){
    this.authservice.login(this.user).then((res: any) => {
      try{
        const result = this.aAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        if(result)
        {
          this.toast.create({
            message: `Welcome to Atelier, ${user.email}`,
            duration: 2000
          }).present();
          this.navCtrl.push(TabsPage, CommentsPage);
         
        }
        else{
          this.toast.create({
            message: `Invalid email or password, please try again`,
            duration: 2000
          }).present();
        }
      }
      catch(e){
        console.log(e);
        this.toast.create({
          message: `Invalid email or password, please try again`,
          duration: 2000
        }).present();
      }
    })
    
  }*/

  async login(user:User){
    this.aAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    .then((res: any) => {
      this.navCtrl.push(TabsPage, CommentsPage);
    }, err => {
      let msg;
      switch (err['code']) {
        case "auth/wrong-password":
          msg= "Invalid email or password, please try again";
          break;
  
        case "auth/user-not-found":
          msg= 'User not found.'
          break;
  
        case "auth/invalid-email":
          msg= 'Invalid email or password, please try again';
          break;
      }
      this.toast.create({
        message: msg,
        duration: 3000
      }).present();
      //alert(msg);
    });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}

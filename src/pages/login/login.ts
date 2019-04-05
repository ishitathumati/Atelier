import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
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
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {password:"123456",
email:"test101@gmail.com"} as User;

  constructor(public toast:ToastController,private aAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
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
  signup() {}

  
  async login(user: User){
    this.authservice.login(this.user).then((res: any) => {
      try{
        const result = this.aAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        if(result)
        {
          this.navCtrl.push(TabsPage, CommentsPage);
         
        }
      }
      catch(e){
        console.error(e);
      }
    })
    
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLeave(){
  this.aAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){
    this.toast.create({
      message: `Welcome to Atelier, ${data.email}`,
      duration: 3000
    }).present();
  }
})
}

}

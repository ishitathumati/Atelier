import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { EditProfPage } from '../pages/edit-prof/edit-prof';
import { ActivityPage } from '../pages/activity/activity';
import { SavedPage } from '../pages/saved/saved';
import { LoginPage } from '../pages/login/login';
//import { SettingsPage } from '../pages/settings/settings';
//import { HelpandSuppPage } from '../pages/helpand-supp/helpand-supp';
//import { LogOutPage } from '../pages/log-out/log-out';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav; Nav;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public menuCtrl: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen )
   {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      {title: 'Edit Profile', component: EditProfPage, icon: 'create'},
      {title: 'Activity', component: ActivityPage, icon: 'clock'},
      {title: 'Saved', component: SavedPage, icon: 'archive'},
      //{title: 'Settings', component: SettingsPage, icon: 'settings'},
      //{title: 'Help and Support', component: HelpandSuppPage, icon: 'help=circle'},
    ];
    
  }
openPage(page){
    this.nav.push(page.component);
}

LogOut(page: any){
  this.nav.setRoot(LoginPage);
  this.menuCtrl.close();
}

}

import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { ExplorePage } from '../explore/explore';
import { NotificationsPage } from '../notifications/notifications';
import { MessagesPage } from '../messages/messages';
//@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserUploadsPage;
  tab3Root = ProfilePage;
  tab4Root = NotificationsPage
  tab5Root = ExplorePage;
  tab6Root = MessagesPage;


  constructor() {

  }
}
